# File Management System

Welcome to the File Management System, a comprehensive solution for organizing and managing your files effortlessly. This application, built using JavaScript and Firebase, offers a user-friendly interface with powerful features to streamline your file management workflow. Notably, it integrates seamlessly with Google Sheets and Google Drive, providing robust synchronization capabilities to ensure your data is always up to date across platforms.

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

## Google Apps Script Integration

The project includes two Google Apps Script files (syncFirebaseToSheet and syncFirebaseToDrive) to synchronize data with Google Sheets and Google Drive:
+ The syncFirebaseToSheet.gs connects to your Firebase Realtime Database, fetches data, and writes it to the active Google Sheet.
+ The syncFirebaseToDrive.gs interfaces with Google Drive, creating folders for files and synchronizing the file storage as per the Firebase database records.

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

## Give Stars ⭐

If you find this project useful or appreciate the work done, please consider giving it a star on GitHub. It helps maintainers prioritize issues and attract contributors, ultimately improving the project for everyone!