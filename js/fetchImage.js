async function fetchImages() {
	const folderUrl = './usrimg/'; // Your image folder URL
	const imageContainer = document.getElementById('image-container');

	try {
		// Fetch the directory listing
		const response = await fetch(folderUrl);
		const text = await response.text();

		// Parse the directory listing as HTML
		const parser = new DOMParser();
		const doc = parser.parseFromString(text, 'text/html');

		// Find all links in the directory that end with an image file extension
		const imageLinks = Array.from(doc.querySelectorAll('a')).filter(link => 
			link.href.match(/\.(jpg|jpeg|png|gif)$/i)
		);

		// Loop through the links and create image elements
		imageLinks.forEach(link => {
			const imageWrapper = document.createElement('div');
			imageWrapper.classList.add('image-wrapper'); // Add a class for styling
			const img = document.createElement('img');
			img.src = link.getAttribute('href');
			img.alt = 'Image';
			img.classList.add('image-box');


			const deleteButton = document.createElement('button');
			deleteButton.className = 'deleteButton';
			deleteButton.onclick = () => handleDelete(img.src);

			const icon = document.createElement('i');
			icon.className = 'fas fa-trash-alt';
			deleteButton.appendChild(icon);
			// Append the image to the wrapper
			imageWrapper.appendChild(img);
			imageWrapper.appendChild(deleteButton);

			// Append the wrapper to the image container
			imageContainer.appendChild(imageWrapper);
		});
	} catch (error) {
		console.error('Error fetching images:', error);
	}
}

async function handleDelete(imageUrl) {
	const confirmDelete = confirm("Are you sure you want to delete this image?");
	if (!confirmDelete) return;

const filename = imageUrl.split('/').pop();

	try {
		const response = await fetch(`${filename}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const imageWrappers = document.querySelectorAll('.image-wrapper');
		imageWrappers.forEach(wrapper => {
		const img = wrapper.querySelector('img');
			if (img && img.src === imageUrl) {
				wrapper.remove();
			}
		});
		alert('Image deleted successfully');
		console.log('Image deleted successfully');
	} catch (error) {
		alert(`Error deleting image: ${error.message}`);
		console.error('Error deleting image:', error);
	}
}

// Fetch and display images when the page loads
window.onload = fetchImages;