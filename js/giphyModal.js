const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

// Function to open modal
function openModal(imageSrc) {
	modalImage.src = imageSrc; // Set the source of the modal image
	imageModal.style.display = 'flex'; // Show the modal
}

// Function to close modal
imageModal.addEventListener('click', () => {
	imageModal.style.display = 'none'; // Hide the modal
});

// Assuming fetchImage.js handles displaying images and calling openModal
// Example to open the modal when an image is clicked
const imageContainer = document.getElementById('gif-results');
imageContainer.addEventListener('click', (e) => {
	if (e.target.tagName === 'IMG') { // Check if clicked element is an image
		openModal(e.target.src); // Open modal with image source
	}
});
