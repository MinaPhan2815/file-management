const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID"
  };
  
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();

const fileForm = document.getElementById('fileForm');
const fileTitleInput = document.getElementById('fileTitle');
const fileDescriptionInput = document.getElementById('fileDescription');
const fileInput = document.getElementById('fileInput');
const fileSubmitButton = document.getElementById('fileSubmitButton');
const fileEditButton = document.getElementById('fileEditButton');
const fileContent = document.getElementById('file-content');
const fileList = document.getElementById('fileList');
const fileProcess = document.getElementById('process')

let files = [];
let selectedFileId = null;

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addFile(title, description, file) {
    const newFile = {
        id: generateId(),
        title,
        fileName: file.name,
        description
    };

    const fileRef = storage.ref().child('files/' + newFile.id + '/' + file.name);

    const fileProcess = document.getElementById('fileProcess');
    fileProcess.style.display = 'block';
    
    const uploadTask = fileRef.put(file);

    uploadTask.on('state_changed',
        function(snapshot) {
            const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
        
            fileProcess.innerHTML = 'Upload is ' + progress + '% done';
        }, 
        function(error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file. Please try again.');
        }, 
        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                newFile.fileURL = downloadURL;
                database.ref('files/' + newFile.id).set(newFile);
                renderFileList();
                clearForm();
                fileProcess.style.display = 'none';
            });
        }
    );
}

function updateFile(id, title, description, file) {
    const index = files.findIndex(file => file.id === id);
    if (index !== -1) {
        const existingFile = files[index];

        const updatedFile = {
            id: id,
            title: title,
            description: description,
            fileName: file ? file.name : existingFile.fileName 
        };

        if (file) {
            const fileProcess = document.getElementById('fileProcess');
            fileProcess.style.display = 'block';

            const fileRef = storage.ref().child(`files/${id}/${existingFile.fileName}`);
            fileRef.delete()
                .then(() => {
                    const newFileRef = storage.ref().child(`files/${id}/${file.name}`);

                    newFileRef.put(file)
                        .on('state_changed', 
                            function(snapshot) {
                                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
                                fileProcess.innerHTML = 'Upload is ' + progress + '% done';
                            }, 
                            function(error) {
                                console.error('Error uploading file:', error);
                                alert('An error occurred while uploading the file. Please try again.');
                            }, 
                            function() {
                                newFileRef.getDownloadURL().then(downloadURL => {
                                    updatedFile.fileURL = downloadURL;

                                    database.ref('files/' + id).update(updatedFile);
                                    renderFileList();
                                    clearForm();
                                    fileProcess.style.display = 'none';
                                });
                            }
                        );
                })
                .catch(error => {
                    console.error('Error deleting old file:', error);
                    alert('An error occurred while deleting the old file. Please try again.');
                });
        } else {
            database.ref('files/' + id).update(updatedFile)
                .then(() => {
                    renderFileList();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error updating file:', error);
                    alert('An error occurred while updating the file. Please try again.');
                });
        }
    }  
}

function clearForm() {
    fileTitleInput.value = '';
    fileDescriptionInput.value = '';
    fileInput.value = '';
    fileContent.innerHTML = '';
    fileSubmitButton.style.display = 'block';
    fileEditButton.style.display = 'none';
    selectedFileId = null;
}

function renderFileList() {
    fileList.innerHTML = '';

    const titleRow = document.createElement('div');
    titleRow.className = 'file-header';
    titleRow.innerHTML = `
        <span><strong>Title</strong></span>
        <span><strong>Description</strong></span>
        <span><strong>Actions</strong></span>
    `;
    fileList.appendChild(titleRow);

    database.ref('files').once('value', snapshot => {
        const data = snapshot.val();
        if (data) {
            Object.values(data).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <span>${file.title}</span>
                    <span>${file.description}</span>
                    <span id="action-btn">
                        <button onclick="viewFile('${file.id}')">View</button>
                        <button onclick="deleteFile('${file.id}')">Delete</button>
                    </span>
                `;
                fileList.appendChild(fileItem);
            });
            files = Object.values(data);
            console.log(files);
        }
    });
}

fileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = fileTitleInput.value.trim();
    const description = fileDescriptionInput.value.trim();
    const file = fileInput.files[0]; 

    if (title && description) {
        if (selectedFileId) {
            updateFile(selectedFileId, title, description, file);
            selectedFileId = null;
        } else {
            if (!file) {
                alert('Please choose a file.');
                return;
            }
            addFile(title, description, file);
        }
    } else {
        alert('Please enter both title and description.');
    }
});

function viewFile(id) {
    const fileToEdit = files.find(file => file.id === id);

    if (fileToEdit) {
        fileTitleInput.value = fileToEdit.title;
        fileDescriptionInput.value = fileToEdit.description;
        selectedFileId = id;
        fileSubmitButton.style.display = 'none';
        fileEditButton.style.display = 'block';
        fileContent.innerHTML = '';

        const googleDriveLink = 'Your-Google-Drive-Link-Here';

        fileContent.innerHTML = `
            <p><strong>Id:</strong> ${fileToEdit.id}</p>
            <p><strong>Saved file:</strong> <a href="${fileToEdit.fileURL}" target="_blank">${fileToEdit.fileName}</a></p>
            <p><strong>Folder Google drive:</strong><a href="${googleDriveLink}" target="_blank"></a></p>
            <p><strong>Choose other file:</strong></p>
        `; 
    }   
}
function deleteFile(id) {
    const confirmDelete = confirm('Are you sure you want to delete this file?');
    if (confirmDelete) {
        const storageRef = storage.ref('files/' + id + '/' + files.find(file => file.id === id).fileName);
        storageRef.delete()
            .then(() => {
                return database.ref('files/' + id).remove();
            })
            .catch(error => {
                console.error('Error deleting file:', error);
                alert('An error occurred while deleting the file. Please try again.');
            });
    }
    clearForm();
    renderFileList();
}

renderFileList();