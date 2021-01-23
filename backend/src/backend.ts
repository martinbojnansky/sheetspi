import { api, ApiAction } from '../../api/api';
import { Controller, controllers } from './controllers';

export default {
  handleRequest: (body: string) => {
    const action = JSON.parse(body) as ApiAction<unknown>;
    const controller: Controller<unknown> = controllers[action.name as keyof typeof api]();
    const response = controller(action);
    return JSON.stringify(response);
  }
}
