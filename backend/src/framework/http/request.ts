import { api, ApiAction } from "../../../../api/api";
import { controllers } from "../../backend";
import { Controller } from "../models";

export const handleRequest = (body: string) => {
  const action = JSON.parse(body) as ApiAction<unknown>;
  const controller: Controller<unknown> = controllers[action.name as keyof typeof api]();
  const response = controller(action);
  return JSON.stringify(response);
}