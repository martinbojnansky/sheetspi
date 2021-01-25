import { api } from "../../../api/api";
import { repositories } from "../backend";
import { Controller } from "../framework/models";

export const getLogsController: Controller<typeof api.getLogs.payloadType> = (action) => {
  return api.getLogs.response(repositories.logs().getAll(action.payload));
}