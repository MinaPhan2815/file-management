function syncFirebaseToSheet() {
  // Define the URL of the Firebase Realtime Database
  var firebaseUrl = "";
  
  const response = UrlFetchApp.fetch(firebaseUrl + ".json");
  const data = JSON.parse(response.getContentText());

  // Get the current active sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();

  // Define the header row
  const headerRow = ['ID', 'Title', 'Description', 'FileName', 'FileURL'];
  const rows = [headerRow];

  // Write data from Firebase to Google Sheets
  for (const id in data) {
    const { title, description, fileName, fileURL } = data[id];
    const row = [id, title, description, fileName, fileURL];
    rows.push(row);
  }

  // Write data from the rows array to Google Sheets, starting from cell A1
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);

  // Format the header row
  sheet.getRange(1, 1, 1, headerRow.length).setFontWeight('bold').setHorizontalAlignment('center');
}
