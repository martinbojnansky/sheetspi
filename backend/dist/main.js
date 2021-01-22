function doPost(e) {
  const response = backend.default.handleRequest(e.postData.contents);
  return ContentService.createTextOutput(response).setMimeType(ContentService.MimeType.JSON);
}