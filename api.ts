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
  requestType: <TRequest>{},
  responseType: <TResponse>{},
  request: (req: TRequest) => createRequest(name, req),
  response: (res: TResponse) => createResponse(res)
});

// ** Define API actions here ** //

export const api = {

  sayHi: createAction<{ name: string }, { greeting: string }>('sayHi')

}