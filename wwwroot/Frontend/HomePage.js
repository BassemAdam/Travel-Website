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
          h3.style.fontSize = '1em'; 
          h3.textContent = item.name;

          let imgContainer = document.createElement('div');
          imgContainer.style.width = '50%'; 

          let img = document.createElement('img');
          img.className = 'd-block w-200 rounded mx-auto lazy'; 
          img.dataset.src = 'data:image/webp;base64,' + item.image; 
          img.alt = 'Slide ' + (i + j + 1);
          img.style.height = '200px'; 
          img.style.width = '100%'; 
          img.style.objectFit = 'cover';

          imgContainer.appendChild(img); 
          col.appendChild(h3);
          col.appendChild(imgContainer); 
          row.appendChild(col);
        }
      }

      carouselItem.appendChild(row);
      carouselInner.appendChild(carouselItem);
    }

    // Set up the Intersection Observer after the images have been added to the DOM
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            observer.unobserve(lazyImage);
          }
        });
      }, {
        root: document.querySelector('.carousel-inner'), 
        threshold: 0.1 
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  })
  .catch(error => console.error('Error:', error));