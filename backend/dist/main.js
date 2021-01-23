function doPost(e) {
  const response = backend.default.handleRequest(e.postData.contents);
  return ContentService.createTextOutput(response).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  // https://levelup.gitconnected.com/import-data-from-google-sheets-to-firestore-using-google-apps-script-b6f857f82a2
  // https://github.com/grahamearley/FirestoreGoogleAppsScript
  const projectId = 'sheetspi';
  const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCycHLV2Q8H42QE\ncIgNFpDCffQp91UBJFmd6LXsPf9NP/+A/5Ip0unHnxYm4FPp7BYPcMvoGHxIrClU\ndfQIhZo/ukw5SyYWZY5Pg52qb8KGYAT4bHVWnZ9lb80YhPV3ve/VGSu6Ngp2R13l\nON92yb3NP5wxtLPCl94BQyrnpgb6a+VvtlC8PsPskv1s809HcMF+3bR5ftlqZQks\n7JvMC7QYLSlCW1s019/JNhrNCJDf7PbeKgdPsvdPEFB5ss1HJG1En8OITo9HX4HY\nS75KdN5yN8r0MdqspF2ZFcmg6prxFXXyTv+5XxhwRusC5XSeuIvnOZW8W1RFE1Ay\nRAbDKOfpAgMBAAECggEASLmw6/yD9kSUsoSExsTQKhy4o1QFRqpghg3e+5KHF56C\nTbqcAUTPeEcb+atLOBc7JH7l9EnqeZoFXEGYvNJq/Bc7UsyQkOdCOaEcZOcY4riG\nvhNCPZOPcAHBlwE1pGB6u6D/I+07lVpf5/kmhp0RqPIIgG+0JhbMajpMZc5SoMQi\nYtdjk9gS96+rPeTiSfzwuPzejozrEq26V7De3okOR1LqYbJQU6h9CRwJ+0GUkpMC\ndU8+ls0bkyDOYeRVejGGKMB1UYyz11M9FVNUkpL881nXpweIw9DFMz4qI0vvRe01\n5NFiGbCkuHYqdMYNCtmL2iZ8/cjAzkHAe+5KpflXowKBgQDxaWfgbzE7rz0HJsd/\neSCVUqu1mKOabUuZu50hK59lWWxnhMLr14p6tbL/LPKPs/d80zSBHdJbkwUkLsLB\nFM55aDatHkvkOEIM03S0FAeWARZxbOTLFukc3Mz06e9rGykqLmKnLY0Golf56LqR\nBMYiRjGGpWnEsnAgBiMmlkLQ9wKBgQC9ON7Ice+2bam9FFsWzWynqCDYHF/1OjXd\n5aRaCoa0Uy1x6Y+xp3eMnXZXQDqAxl6xOJZ1g1T9s9OIFX0zbLfaLqC5MplRuB92\nCfzRMmQuuCbJ615LmlYa+mzdMUGds4BZrm7E4sMBBEDPrEZF5L8O6/3MMtTXPSjo\n+VuntQ62HwKBgCN/sXOyRhYVta6oiCt5f04V4wQIFv6tVbGcggWPqZe4p5UtU5Bk\nmItkzpZxYJW7DAiB8jWOUhF/NAFXEvJbgeUeavPYAabkkunZ6k5Up6zqKgex0I8A\npnTFDypwf/FLBCmcuosEyrkQBEnObCjI/+2oTr4S8tOmvZAn9uFEtTyPAoGBALU2\ngIzAKMyxyyusEewNgXAyoHm2+uLUA4Bli3c7u3N4cP41qop9kg0VQ58dgKmQ0GCy\ni80woDVzgTJDOisEhDIsE3opDhHn3iFiQT9rHexsKaGYii6nOK0PhTB0Gp3XqSS5\n25UsgYo4s4TvPEF1Zs/4i4+CYrla9hHftLowuE0LAoGBAIi+fGPnypEtUyPt0NDl\n7CiV0Gt3kmIG4NUlMMkkLi8imKIe10Y1VCUgycpOI/xPxlvsGFQrzGZgRe443rjt\neMXpPYMy3U0ef2ILmkrkg2pYSI0QAW3gEfttezWOjJ1kuMvXgkpfZmhkf3ZlcQ43\n+XZE7KIzp1YxQU9W/5rTTYWB\n-----END PRIVATE KEY-----\n';
  const clientEmail = 'firebase-adminsdk-c5gkr@sheetspi.iam.gserviceaccount.com';
  const firestore = FirestoreApp.getFirestore(clientEmail, privateKey, projectId, 'v1');
  const existingLog = firestore.getDocument('log/7kxwjo7v8sDUrcROygMO');
  const newLog = firestore.createDocument('log', { message: 'automatic log at: ' + new Date().toString() });
  const allLogs = firestore.getDocuments('log');
  return ContentService.createTextOutput(JSON.stringify({
    existingLog: existingLog,
    newLog: newLog,
    allLogs: allLogs
  })).setMimeType(ContentService.MimeType.JSON);
}