import { api, ApiAction } from "../../api";
import { repositories } from "./repositories";

export type Controller<TPayload> = (action: ApiAction<TPayload>) => unknown;

const sayHiController = (action: ApiAction<typeof api.sayHi.payloadType>) => {
  return api.sayHi.response({ greeting: `Hello, ${action.payload.name}! It's ${new Date().toString()}` });
}

const getLogsController = (action: ApiAction<typeof api.getLogs.payloadType>) => {
  return api.getLogs.response({ values: repositories.logs().getAll() });
}

export const controllers: { [key in keyof typeof api]: () => Controller<unknown> } = {
  sayHi: () => sayHiController,
  getLogs: () => getLogsController
}