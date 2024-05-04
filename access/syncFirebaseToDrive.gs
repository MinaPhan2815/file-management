function syncFirebaseToDrive() {
  var folderId = 'your_folder_id'; // Replace 'your_folder_id' with the ID of the folder where you want to store files in Google Drive
  var folder = DriveApp.getFolderById(folderId);

  var firebaseUrl = 'your_url_database'; // Replace with the URL of your Firebase Realtime Database
  var response = UrlFetchApp.fetch(firebaseUrl);
  var filesData = JSON.parse(response.getContentText());

  for (var fileId in filesData) {
    var file = filesData[fileId];
    var folderPath = folder.getFoldersByName(fileId); 
    // Check if the subfolder exists
    if (folderPath.hasNext()) {
      var existingFolder = folderPath.next();
      var existingFiles = existingFolder.getFiles(); 
      while (existingFiles.hasNext()) {
        // Delete all existing files in the subfolder if the new file is different from the old file
        var oldFile = existingFiles.next();
        if (oldFile.getName() === file.fileName) {
            continue; 
        }
        oldFile.setTrashed(true);
      }
      // Create a new file in the subfolder if the old file is not found or is different from the new file
      if (!existingFolder.getFilesByName(file.fileName).hasNext()) {
        var fileBlob = UrlFetchApp.fetch(file.fileURL).getBlob();
        var newFile = existingFolder.createFile(fileBlob);
        newFile.setName(file.fileName); 
      }
    } else {
      // Subfolder does not exist, create a new one and add the file
      var newFolder = folder.createFolder(fileId);
      var fileBlob = UrlFetchApp.fetch(file.fileURL).getBlob();
      var newFile = newFolder.createFile(fileBlob);
      newFile.setName(file.fileName);
    }
  }

  // Delete folders in Google Drive if they do not exist in the Firebase data
  var folders = folder.getFolders();
  while (folders.hasNext()) {
    var subFolder = folders.next();
    var subFolderName = subFolder.getName();
    if (!filesData[subFolderName]) {
      subFolder.setTrashed(true);
    }
  }
}
