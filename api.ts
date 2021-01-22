const createRequest = <TPayload>(action: string, payload?: TPayload) => ({
  action: action,
  payload: payload
});

const createResponse = <TPayload>(action: string, payload?: TPayload) => ({
  action: action,
  payload: payload
});

const createAction = <TRequest, TResponse>(action: string) => ({
  requestType: <TRequest>{},
  responseType: <TResponse>{},
  request: (req: TRequest) => createRequest(action, req),
  response: (res: TResponse) => createResponse(action, res)
});

// ** Define API actions here ** //

export const api = {

  sayHi: createAction<{ name: string }, { greeting: string }>('sayHi'),

}