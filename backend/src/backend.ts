import { api, ApiAction } from '../../api';

export default {
  handleRequest: (body: any) => {
    let request, response;

    const action = JSON.parse(body) as ApiAction<unknown>;

    switch (action.name as keyof typeof api) {

      case 'sayHi':
        request = action.payload as typeof api.sayHi.requestType;
        response = api.sayHi.response({ greeting: `Hello, ${request.name}! It's ${new Date().toString()}` })
        break;

    }

    return JSON.stringify(response);
  }
}