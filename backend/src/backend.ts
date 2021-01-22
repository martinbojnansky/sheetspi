export default {
  doGet: (e: any) => {
    return ContentService
      .createTextOutput(JSON.stringify({ response: 'Hello, world!' }))
      .setMimeType(ContentService.MimeType.JSON);
  },
  doPost: (e: any) => {
    return ContentService.createTextOutput(JSON.stringify({ response: 'Thanks!' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}