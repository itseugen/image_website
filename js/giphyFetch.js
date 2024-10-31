async function searchGifs() {
	const query = document.getElementById("searchInput").value;
	const errorMessage = document.getElementById("error-message");
	errorMessage.textContent = ""; // Clear previous error messages

	try {
		const response = await fetch(`/cgi-bin/giphy_search.py?query=${encodeURIComponent(query)}`);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const gifs = await response.json();
		displayGifs(gifs);
	} catch (error) {
		console.error("Error fetching GIFs:", error);
		const errorMessage = document.getElementById("error-message");
		errorMessage.textContent = "Error fetching GIFs: " + error.message; // Display error message
	}
}

// Listen for "Enter" key in the search field
document.getElementById("searchInput").addEventListener("keypress", function (e) {
	if (e.key === "Enter") { // Check if the key pressed is "Enter"
		searchGifs(); // Call the search function
	}
});

function displayGifs(gifs) {
	const gifContainer = document.getElementById("gif-results");
	gifContainer.innerHTML = ""; // Clear previous GIFs
	gifs.forEach(gif => {
		const gifWrapper = document.createElement("div");
		gifWrapper.classList.add("image-wrapper"); // Add a class for styling
		const img = document.createElement("img");
		img.src = gif.images.fixed_height.url;
		img.alt = 'GIF';
		img.classList.add("image-box");

		// Append the image to the wrapper
		gifWrapper.appendChild(img);

		// Append the wrapper to the GIF container
		gifContainer.appendChild(gifWrapper);
	});
}