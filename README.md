# File Management System

Welcome to the File Management System, a comprehensive solution for organizing and managing your files effortlessly. This application, built using JavaScript and Firebase, offers a user-friendly interface with powerful features to streamline your file management workflow. Notably, it integrates seamlessly with Google Sheets and Google Drive, providing robust synchronization capabilities to ensure your data is always up to date across platforms.

## Getting Started

Please ensure Node.js is installed and you have a Firebase account prepared for this application. It integrates with Google Sheets and Google Drive, requiring specific permissions for operation.

## Features
### Easy File Management
- Add, Edit, and Delete Files: Seamlessly add new files, modify existing ones, or remove files as needed, all through an intuitive user interface.
- View File Details: Gain insights into each file's details, including its title, description, and associated metadata.
- Clear and Concise Interface: Enjoy a clutter-free experience with a clean and organized interface designed for efficiency and ease of use.
### Seamless Integration with Google Services
- Sync Data with Google Sheets: Automatically synchronize your file data with Google Sheets, allowing for real-time collaboration and data analysis.
- Sync Files with Google Drive: Effortlessly manage your files across devices by syncing them with Google Drive, ensuring seamless access and backup.

## Installation

Clone the repository and open `index.html` in your browser to start the application.

## Firebase Configuration

Modify `app.js` to include your Firebase configuration:

```javascript
const firebaseConfig = {
  // ... your Firebase config
};
firebase.initializeApp(firebaseConfig);

```
## Google Apps Script Integration
There are specific scripts to automate data synchronization between Firebase, Google Sheets, and Google Drive.

### Google Sheets Sync
- Setting Up The Google Sheet:
     Open Google Sheets and create a new spreadsheet for file data synchronization.
     Navigate to Extensions > Apps Script from within the Google Sheets menu.
     Clear any existing code and paste the content of syncFirebaseToSheet.gs into the online editor.
     Save the script project.
- Automating the Script:
     Set a trigger to execute the syncFirebaseToSheet function periodically:
     Within the Apps Script editor, click on the clock icon to open the Triggers page.
     Click "Add Trigger" in the bottom right corner.
     Configure the trigger to run the syncFirebaseToSheet function, set event source to "Time-driven" and select the interval for execution.
### Google Drive Sync
Ensure to set up the syncWithFirebase script in a similar manner to handle synchronization tasks with Google Drive.

## Technologies
- HTML
- CSS
- JavaScript
- Firebase
- Google Apps Script
- Google Sheets API
- Google Drive API

## Author
This project was developed by MinhNhatPhan. You can reach out to the author via email at minhnhatphan2815@gmail.com for any inquiries or support related to the File Management System.

## License
This project is provided as-is without any specific license. You are free to use and modify the code for personal or educational purposes. However, please note that the author holds no liability for any consequences arising from the use of this software.
