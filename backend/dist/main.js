function doPost(e) {
  const body = e.postData.contents;
  return ContentService.createTextOutput(backend.default.handleRequest(body)).setMimeType(ContentService.MimeType.JSON);
}