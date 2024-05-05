fetch('/places/all')
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    let carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = '';

    for (let i = 0; i < data.length; i += 3) {
      let carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      if (i === 0) {
        carouselItem.className += ' active';
      }

      let row = document.createElement('div');
      row.className = 'row';
    for (let j = 0; j < 3; j++) {
        if (i + j < data.length) {
          let item = data[i + j];
          let col = document.createElement('div');
          col.className = 'col-md-4 position-relative d-flex justify-content-center';
          col.style.overflow = 'hidden';

          let h3 = document.createElement('h3');
          h3.className = 'position-absolute p-3 top-0 right-0 text-white';
          h3.style.zIndex = '1';
          h3.style.fontSize = '1em'; // Decreased from default size to 1em
          h3.textContent = item.name;

          let imgContainer = document.createElement('div');
          imgContainer.style.width = '50%'; // Set the width of the container to 50%

          let img = document.createElement('img');
          img.className = 'd-block w-200 rounded mx-auto'; // Add mx-auto to center the image
          img.src = 'data:image/webp;base64,' + item.image;
          img.alt = 'Slide ' + (i + j + 1);
          img.style.height = '200px'; // Decreased from 400px to 200px
          img.style.width = '100%'; // Set the width of the image to 100%
          img.style.objectFit = 'cover';

          imgContainer.appendChild(img); // Append the image to the container
          col.appendChild(h3);
          col.appendChild(imgContainer); // Append the container to the column
          row.appendChild(col);
        }
      }

      carouselItem.appendChild(row);
      carouselInner.appendChild(carouselItem);
    }

    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', function() {
        selectImage(this);
      });
    });
  })
  .catch(error => console.error('Error:', error));