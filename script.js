document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    const images = document.querySelectorAll('.image-container img');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const rightSide = document.querySelector('.right-side');

    // Clone images to create a seamless scroll
    images.forEach(image => {
        const clone = image.cloneNode(true);
        imageContainer.appendChild(clone);
    });

    const searchImages = () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        let foundImage = null;

        images.forEach(image => {
            const imageName = image.src.split('/').pop().toLowerCase(); // Extract the filename
            if (imageName.includes(searchValue)) {
                foundImage = image;
                return;
            }
        });

        if (foundImage) {
            // Highlight the found image
            images.forEach(image => {
                image.style.border = 'none';
            });
            foundImage.style.border = '5px solid red';
            
            // Scroll to the found image
            foundImage.scrollIntoView({ behavior: 'smooth' });

            // Add the reduced speed class for 30 seconds
            rightSide.classList.add('reduced-speed');
            setTimeout(() => {
                rightSide.classList.remove('reduced-speed');
            }, 30000);
        } else {
            alert('Image not found');
        }
    };

    // Click event listener for search button
    searchButton.addEventListener('click', searchImages);

    // Keydown event listener for Enter key in search input
    searchInput.addEventListener('keydown', event => {
        if (event.keyCode === 13) { // Enter key
            searchImages();
        }
    });
});
