import { TableQuery } from "../../../api/models";
import { Repository } from "../framework/models";

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
    // Maybe the best way to filter out soft deleted items would be changing named
    // range after add or delete.
    // this.spreadsheet.setNamedRange();
    // this.spreadsheet.removeNamedRange()
    // this.sheet.deleteRow();

    let rows = this.sheet.getDataRange().getValues();
    // Remove headers row.
    rows.shift();
    // Apply paging info.
    const start = query?.skip ? query.skip : 0;
    const end = start ? start + (query?.top ? query.top : 0) : undefined;
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