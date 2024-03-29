import { Log, LogCreateDTO, TableQuery } from './models';

export interface ApiAction<TPayload> {
  name: string,
  payload: TPayload
}

const createRequest = <TPayload>(name: string, payload?: TPayload): ApiAction<TPayload> => ({
  name: name,
  payload: payload
});

const createResponse = <TPayload>(payload?: TPayload): TPayload => ({
  ...payload
});

const createAction = <TRequest, TResponse>(name: string) => ({
  request: (req: TRequest) => createRequest(name, req),
  payloadType: <TRequest>{},
  response: (res: TResponse) => createResponse(res),
  responseType: <TResponse>{}
});

export const api = {
  sayHi: createAction<{ name: string }, { greeting: string }>('sayHi'),
  getLogs: createAction<TableQuery, Log[]>('getLogs'),
  getLog: createAction<string, Log>('getLog'),
  createLog: createAction<LogCreateDTO, Log>('createLog'),
  deleteLog: createAction<string, void>('deleteLog')
}