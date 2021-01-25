import { TableQuery } from "../../../api/models";
import { Repository } from "../framework/models";
import { uuid } from "../framework/tools/uuid";

export class SpreadsheetRepository<T> implements Repository<T> {
  protected readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  protected readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;
  protected readonly headers: string[];

  constructor(spreadsheetId: string, sheetName: string) {
    this.spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    this.sheet = this.spreadsheet.getSheetByName(sheetName);
    this.headers = this.getRowAt(1);
  }

  getAll = (query: TableQuery): T[] => {
    const rows = this.getAllRows(query);
    const items = rows.map(row => this.mapFromRow(row));
    return items;
  };

  getById = (id: string): T => {
    return this.mapFromRow(this.getRowById(id));
  }

  create = (item: T): T => {
    const row = this.mapToRow(item);
    const id = row[0] = uuid();
    this.spreadsheet.appendRow(row);
    return this.getById(id);
  }

  delete = (id: string) => {
    this.sheet.deleteRow(this.getRowIndexById(id));
  }

  protected getAllRows(query: TableQuery) {
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

  protected mapToRow(item: Partial<T>): any[] {
    const row: any[] = [];
    this.headers.forEach((header, index) => {
      const columnValue = item[header as keyof T];
      row.push(columnValue || '')
    });
    return row;
  }

  protected getRowAt(index: number): any[] {
    return this.sheet.getSheetValues(index, 1, 1, this.sheet.getMaxColumns())[0];
  }

  protected getRowById(id: string): any[] {
    return this.getRowAt(this.getRowIndexById(id));
  }

  protected getRowIndexById(id: string): number {
    return this.sheet.getRange(1, 1, this.sheet.getMaxRows(), this.sheet.getMaxColumns())
      .createTextFinder(id).matchEntireCell(true).findPrevious().getRowIndex();
  }
}