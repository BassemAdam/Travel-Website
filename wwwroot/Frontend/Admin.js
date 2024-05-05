const addForm = document.querySelector('#add form');
const titleInput = addForm.querySelector('#title');
const imageInput = addForm.querySelector('#image');

addForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('name', titleInput.value);
  
  if (imageInput.files[0].type === 'image/webp' || imageInput.files[0].type === 'image/avif') {
    formData.append('image', imageInput.files[0]);
  } else {
    alert('Please select a WebP or AVIF image');
    return;
  }

  formData.forEach((value, key) => {
    console.log(key + ': ' + value);
  });

  fetch('/places', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);

    let successMessage = document.createElement('p');
    successMessage.textContent = 'Successfully added place';
    successMessage.style.color = 'green';

    addForm.appendChild(successMessage);

    setTimeout(() => {
      addForm.removeChild(successMessage);
    }, 3000);
  })
  .catch(error => {
    console.error('Error:', error);

    let errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error adding place';
    errorMessage.style.color = 'red';

    addForm.appendChild(errorMessage);

    setTimeout(() => {
      addForm.removeChild(errorMessage);
    }, 3000);
  });
});

fetch('/places/names')
  .then(response => response.json())
  .then(data => {
    let select = document.querySelector('#removePlaceSelect');
    data.forEach(item => {
      let option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      select.appendChild(option);
    });
  })
  .catch(error => console.error('Error:', error));

const removeForm = document.querySelector('#remove form');

removeForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let selectedOption = document.querySelector('#removePlaceSelect option:checked');
  fetch(`/places/${selectedOption.value}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);

    let successMessage = document.createElement('p');
    successMessage.textContent = 'Successfully deleted place';
    successMessage.style.color = 'green';

    removeForm.appendChild(successMessage);

    setTimeout(() => {
      removeForm.removeChild(successMessage);
    }, 3000);
  })
  .catch(error => {
    console.error('Error:', error);

    let errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error deleting place';
    errorMessage.style.color = 'red';

    removeForm.appendChild(errorMessage);

    setTimeout(() => {
      removeForm.removeChild(errorMessage);
    }, 3000);
  });
});