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

// API definition goes here. //
export const api = {
  sayHi: createAction<{ name: string }, { greeting: string }>('sayHi'),
}