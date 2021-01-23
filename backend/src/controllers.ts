import { api, ApiAction } from "../../api/api";
import * as moment from "moment";
import { repositories } from "./repositories";

export type Controller<TPayload> = (action: ApiAction<TPayload>) => unknown;

const sayHiController = (action: ApiAction<typeof api.sayHi.payloadType>) => {
  return api.sayHi.response({ greeting: `Hello, ${action.payload.name}! It's ${moment(moment.now()).format('HH:MM:ss')}` });
}

const getLogsController = (action: ApiAction<typeof api.getLogs.payloadType>) => {
  return api.getLogs.response(repositories.logs().getAll(action.payload));
}

export const controllers: { [key in keyof typeof api]: () => Controller<unknown> } = {
  sayHi: () => sayHiController,
  getLogs: () => getLogsController
}