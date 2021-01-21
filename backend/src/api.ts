export default {
  doGet: (e: any) => {
    return ContentService
      .createTextOutput(JSON.stringify({ response: 'Hello, world!' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}