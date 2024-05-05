var selectedImage = null;

function selectImage(imgElement) {
  let selectedImage = document.querySelector('.selected');
  if (selectedImage) {
    selectedImage.classList.remove('selected');
  }
  imgElement.classList.add('selected');
}

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
          col.className = 'col-md-4 position-relative';
          col.style.overflow = 'hidden';

          let h3 = document.createElement('h3');
          h3.className = 'position-absolute p-3 top-0 right-0 text-white';
          h3.style.zIndex = '1';
          h3.textContent = item.name;

          let img = document.createElement('img');
          img.className = 'd-block w-200 rounded';
          img.src = 'data:image/jpeg;base64,' + item.image;
          img.alt = 'Slide ' + (i + j + 1);
          img.style.height = '400px';
          img.style.width = '100%';
          img.style.objectFit = 'cover';

          col.appendChild(h3);
          col.appendChild(img);
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