import { ApiAction } from "../../../api/api";
import { TableQuery } from "../../../api/models";

export type Controller<TPayload> = (action: ApiAction<TPayload>) => unknown;

export interface Repository<T> {
  getAll: (query: TableQuery) => T[];
  getById: (id: string) => T;
  create: (item: T) => T;
}