import { api } from '../../api';

export default {
  doPost: (e: any) => {
    let request, response;

    // https://developers.google.com/apps-script/guides/web#request_parameters
    const body = JSON.parse(e.postData.contents);

    switch (body.action as keyof typeof api) {

      case 'sayHi':
        request = body.payload as typeof api.sayHi.requestType;
        response = api.sayHi.response({ greeting: `Hello, ${request.name}! It's ${new Date().toString()}` })
        break;

    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
}