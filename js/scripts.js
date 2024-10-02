
document.addEventListener("DOMContentLoaded", function () {
	const imageContainer = document.querySelector('.image-container');

	// Function to fetch and display images
	async function loadImages() {
			try {
				const response = await fetch('/usrimg'); // Adjust this path to your server setup
				const images = await response.json(); // Assuming your server returns a JSON array of image filenames

				images.forEach(image => {
				const imageWrapper = document.createElement('div');
				imageWrapper.className = 'imageWrapper';
				
				const imgElement = document.createElement('img');
				imgElement.src = `/usrimg/${image}`; // Adjust path as necessary
				imgElement.alt = image; // Set alt attribute for accessibility
				imageWrapper.appendChild(imgElement);
				imageContainer.appendChild(imageWrapper);
			});
		}
		catch (error) {
			console.error('Error loading images:', error);
		}
	}

	loadImages();
});
