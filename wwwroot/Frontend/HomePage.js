var selectedImage = null;
    
function selectImage(imgElement) {
  // Get the previously selected image
  let selectedImage = document.querySelector('.selected');

  // If there is a previously selected image, remove the 'selected' class
  if (selectedImage) {
    selectedImage.classList.remove('selected');
  }

  // Add the 'selected' class to the clicked image
  imgElement.classList.add('selected');
}
// Fetch data from the API
fetch('/places/all')
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the data

    // Get the carousel inner div
    let carouselInner = document.querySelector('.carousel-inner');

    // Clear the carousel inner div
    carouselInner.innerHTML = '';

    // Loop through the data
    for (let i = 0; i < data.length; i += 3) {
      // Create a new carousel item div
      let carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      if (i === 0) {
        carouselItem.className += ' active';
      }

      // Create a new row div
      let row = document.createElement('div');
      row.className = 'row';

      // Create three columns for each carousel item
      for (let j = 0; j < 3; j++) {
        if (i + j < data.length) {
          let item = data[i + j];

                // Create a new col div
        let col = document.createElement('div');
        col.className = 'col-md-4 position-relative';
        col.style.overflow = 'hidden'; // Add this line

        // Create a new h3 element
        let h3 = document.createElement('h3');
        h3.className = 'position-absolute p-3 top-0 right-0 text-white';
        h3.style.zIndex = '1';
        h3.textContent = item.name;

            // Create a new img element
        let img = document.createElement('img');
        img.className = 'd-block w-200 rounded';
        img.src = 'data:image/jpeg;base64,' + item.image; // Use the Base64 string as the src
        img.alt = 'Slide ' + (i + j + 1);
        img.style.height = '400px'; // Set a fixed height for all images
        img.style.width = '100%'; // Set the width to 100%
        img.style.objectFit = 'cover'; // Ensure images cover the entire space

        // Append the h3 and img to the col div
        col.appendChild(h3);
        col.appendChild(img);

        // Append the col div to the row div
        row.appendChild(col);
        }
      }

      // Append the row div to the carousel item div
      carouselItem.appendChild(row);

      // Append the carousel item div to the carousel inner div
      carouselInner.appendChild(carouselItem);
    }
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', function() {
          selectImage(this);
        });
      });
  })
  .catch(error => console.error('Error:', error));