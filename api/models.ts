export interface TableQuery {
  skip?: number;
  top?: number;
}

export interface Log {
  id: number,
  message: string,
  dateCreated: Date
}