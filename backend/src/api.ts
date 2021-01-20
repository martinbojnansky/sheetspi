export default {
  doGet: (e: any) => {
    return HtmlService.createHtmlOutputFromFile('index');
  }
}