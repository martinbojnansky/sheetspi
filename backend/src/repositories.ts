export interface Repository<T> {
  getAll: () => T[][];
  update: (id: string, values: any[]) => any[];
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

  update = (id: string, values: any[]) => {
    const row = this.getRowById(id);
    row.setValues([[...values]]);
    return row.getValues();
  }

  protected getRowById(id: string) {
    const index = this.sheet.getRange('A:A').createTextFinder(id).findNext().getRowIndex();
    return this.sheet.getRange(`A${index}:B${index}`);
  }
}

export const repositories = {
  logs: (): Repository<string> => new SpreadsheetRepository<string>('1KQ_V8pdqrELD2o01xEY4wvaEPYBcdpvVMLouMJXh3HY', 'logs')
}