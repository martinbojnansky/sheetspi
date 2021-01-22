export default {
  // See https://developers.google.com/apps-script/guides/web#request_parameters
  doGet: (e: any) => {
    return ContentService
      .createTextOutput(JSON.stringify({ response: `Hello, ${e?.parameters?.name}!` }))
      .setMimeType(ContentService.MimeType.JSON);
  },
  // https://developers.google.com/apps-script/guides/web#request_parameters
  doPost: (e: any) => {
    const body = JSON.parse(e?.postData?.contents);
    return ContentService.createTextOutput(JSON.stringify({ response: `Thanks, ${body?.name}!` }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}