export interface Repository<T> {
  getAll: () => T[][];
}

export class SpreadsheetRepository<T> implements Repository<T> {
  protected readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  protected readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(spreadsheetId: string, sheetName: string) {
    this.spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    this.sheet = this.spreadsheet.getSheetByName(sheetName);
  }

  getAll = (): T[][] => {
    return this.sheet.getDataRange().getValues();
  };
}

export const repositories = {
  logs: (): Repository<string> => new SpreadsheetRepository<string>('1KQ_V8pdqrELD2o01xEY4wvaEPYBcdpvVMLouMJXh3HY', 'logs')
}