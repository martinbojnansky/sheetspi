export interface TableQuery {
  skip?: number;
  top?: number;
}

export interface Log {
  id: string,
  message: string,
  dateCreated: Date
}

export interface LogCreateDTO extends Partial<Log> {
  message: string
}