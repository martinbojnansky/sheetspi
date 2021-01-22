import { api, ApiAction } from '../../api';
import { Controller, controllers } from './controllers';

export default {
  handleRequest: (body: string) => {
    const action = JSON.parse(body) as ApiAction<unknown>;
    const reducer: Controller<unknown> = controllers[action.name as keyof typeof api];
    const response = reducer(action);
    return JSON.stringify(response);
  }
}
