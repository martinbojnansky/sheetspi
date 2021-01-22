import { api, ApiAction } from "../../api";

export type Controller<TPayload> = (action: ApiAction<TPayload>) => unknown;

// Simple controller that returns a greeting using provided name in request.
const sayHiController = (action: ApiAction<typeof api.sayHi.payloadType>) => {
  return api.sayHi.response({ greeting: `Hello, ${action.payload.name}! It's ${new Date().toString()}` });
}

// Controllers registration. Each action needs to have a controller registered.
export const controllers: { [key in keyof typeof api]: Controller<unknown> } = {
  sayHi: sayHiController
}