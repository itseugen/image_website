const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
let selectedFile = null;
let isFileSelected = false;

dropZone.addEventListener('dragover', (e) => {
	e.preventDefault();
	dropZone.style.borderColor = 'blue';
});

dropZone.addEventListener('dragleave', () => {
	dropZone.style.borderColor = '#ccc';
});

dropZone.addEventListener('drop', (e) => {
	e.preventDefault();
	dropZone.style.borderColor = '#ccc';
	const files = e.dataTransfer.files;
	if (files.length) {
		selectedFile = files[0];
		displaySelectedFile();
	}
});

dropZone.addEventListener('click', (e) => {
	if (!isFileSelected) {
		fileInput.click();
	}
});

fileInput.addEventListener('change', (e) => {
	selectedFile = e.target.files[0];
	displaySelectedFile();
});

function displaySelectedFile() {
	if (selectedFile) {
		const maxLength = 20;
		const fileName = selectedFile.name;
		const extension = fileName.split('.').pop();
		const baseName = fileName.slice(0, fileName.length - extension.length - 1); // Get the base name without extension

		let displayName = fileName;

		if (baseName.length > maxLength) {
			displayName = baseName.slice(0, maxLength) + '(...)' + extension;
		}
		uploadButton.textContent = `Upload ${displayName}`;
		uploadButton.disabled = false;
		isFileSelected = true;
	}
}

function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

// Handle file upload
uploadButton.addEventListener('click', async () => {
		if (selectedFile == false || uploadButton.textContent == 'Select File') {
			fileInput.click();
			return;
		}

	uploadButton.textContent = 'Uploading...';
	uploadButton.disabled = true;

	const formData = new FormData();

	let newFileName;
	const len = 240 - selectedFile.name.length;
	if (len > 0) {
		const randomString = generateRandomString(len);
		newFileName = randomString + '-' + selectedFile.name.replace(/ /g, '%20');
	}
	else {
		newFileName = selectedFile.name;
	}

		formData.append('file', new File([selectedFile], newFileName));
	// formData.append('file', selectedFile);

	try {
		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			alert('Image uploaded successfully!');
			selectedFile = null;
			uploadButton.textContent = 'Select File';
			isFileSelected = false;
		} else {
			alert('Image upload failed.');
			}
	} catch (error) {
		console.error(error);
		alert('Image upload failed.');
	} finally {
		uploadButton.textContent = 'Select File';
		uploadButton.disabled = false;
	}
});
