import { api } from "../../../api/api";
import * as moment from "moment";
import { Controller } from "../framework/models";

export const sayHiController: Controller<typeof api.sayHi.payloadType> = (action) => {
  return api.sayHi.response({ greeting: `Hello, ${action.payload.name}! It's ${moment(moment.now()).format('HH:MM:ss')}` });
}