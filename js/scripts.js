document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector(".image-container");

    // Fetch the directory listing from the server
    fetch('/usrimg/')
        .then(response => response.text())
        .then(html => {
            // Use a temporary DOM element to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extract the filenames from the listing
            const fileNames = Array.from(tempDiv.querySelectorAll('body')).map(el => el.innerText.trim());

            // Append each image to the image container
            fileNames.forEach(file => {
                const img = document.createElement('img');
                img.src = `/usrimg/${file}`;
                img.alt = "User uploaded image";
                img.classList.add("gallery-image");
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
});
