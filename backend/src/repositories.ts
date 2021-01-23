import { Log, TableQuery } from "../../api/models";

export interface Repository<T> {
  getAll: (query: TableQuery) => T[];
}

export class SpreadsheetRepository<T> implements Repository<T> {
  protected readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  protected readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;
  protected readonly headers: string[];

  constructor(spreadsheetId: string, sheetName: string) {
    this.spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    this.sheet = this.spreadsheet.getSheetByName(sheetName);
    this.headers = this.sheet.getSheetValues(1, 1, 1, this.sheet.getMaxColumns())[0];
  }

  getAll = (query: TableQuery): T[] => {
    const rows = this.getAllRows(query);
    const items = rows.map(row => this.mapFromRow(row));
    return items;
  };

  protected getAllRows(query: TableQuery) {
    let rows = this.sheet.getDataRange().getValues();

    // Remove headers row.
    rows.shift();

    // Apply paging info.
    const start = query?.skip ? query.skip : 0;
    const end = start + (query?.top ? query.top : 0);
    rows = rows.slice(start, end);

    return rows;
  }

  protected mapFromRow(values: any[]) {
    const item = <any>{};
    this.headers.forEach((name, index) => {
      item[name] = values[index]
    });
    return item as T;
  }
}

export const repositories = {
  logs: (): Repository<Log> => new SpreadsheetRepository<Log>('1KQ_V8pdqrELD2o01xEY4wvaEPYBcdpvVMLouMJXh3HY', 'logs')
}