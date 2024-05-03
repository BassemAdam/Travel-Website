var selectedImage = null;
    
function selectImage(imgElement) {
    // Remove the 'selected' class from the previously selected image, if any
    if (selectedImage) {
        selectedImage.classList.remove('selected');
    }

    // Add the 'selected' class to the clicked image
    imgElement.classList.add('selected');

    // Update the selected image
    selectedImage = imgElement;

    // Do something with the selected image source
    console.log('Selected image:', imgElement.src);
}

// Fetch data from the API
fetch('https://localhost:7241/places')
  .then(response => response.json())
  .then(data => {
    // Get the carousel inner div
    let carouselInner = document.querySelector('.carousel-inner');

    // Clear the carousel inner div
    carouselInner.innerHTML = '';

    // Loop through the data
    data.forEach((item, index) => {
      // Create a new carousel item div
      let carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      if (index === 0) {
        carouselItem.className += ' active';
      }

      // Create a new row div
      let row = document.createElement('div');
      row.className = 'row';

      // Create a new col div
      let col = document.createElement('div');
      col.className = 'col position-relative';

      // Create a new h3 element
      let h3 = document.createElement('h3');
      h3.className = 'position-absolute p-3 top-0 right-0 text-white';
      h3.style.zIndex = '1';
      h3.textContent = item.headerText;

      // Create a new img element
      let img = document.createElement('img');
      img.className = 'd-block w-100 rounded';
      img.src = item.imageUrl;
      img.alt = 'Slide ' + (index + 1);
      img.onclick = function() { selectImage(this); };

      // Append the h3 and img to the col div
      col.appendChild(h3);
      col.appendChild(img);

      // Append the col div to the row div
      row.appendChild(col);

      // Append the row div to the carousel item div
      carouselItem.appendChild(row);

      // Append the carousel item div to the carousel inner div
      carouselInner.appendChild(carouselItem);
    });
  })
  .catch(error => console.error('Error:', error));