// Add Place
const addForm = document.querySelector('#add form');
const titleInput = addForm.querySelector('#title');
const imageInput = addForm.querySelector('#image');

addForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('name', titleInput.value);
  formData.append('image', imageInput.files[0]);

  // Log the data
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

    // Create a new success message element
    let successMessage = document.createElement('p');
    successMessage.textContent = 'Successfully added place';
    successMessage.style.color = 'green';

    // Append the success message to the form
    addForm.appendChild(successMessage);

    // Remove the success message after 3 seconds
    setTimeout(() => {
      addForm.removeChild(successMessage);
    }, 3000);
  })
  .catch(error => {
    console.error('Error:', error);

    // Create a new error message element
    let errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error adding place';
    errorMessage.style.color = 'red';

    // Append the error message to the form
    addForm.appendChild(errorMessage);

    // Remove the error message after 3 seconds
    setTimeout(() => {
      addForm.removeChild(errorMessage);
    }, 3000);
  });
});


// Remove Place
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

    // Create a new success message element
    let successMessage = document.createElement('p');
    successMessage.textContent = 'Successfully deleted place';
    successMessage.style.color = 'green';

    // Append the success message to the form
    removeForm.appendChild(successMessage);

    // Remove the success message after 3 seconds
    setTimeout(() => {
      removeForm.removeChild(successMessage);
    }, 3000);
  })
  .catch(error => {
    console.error('Error:', error);

    // Create a new error message element
    let errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error deleting place';
    errorMessage.style.color = 'red';

    // Append the error message to the form
    removeForm.appendChild(errorMessage);

    // Remove the error message after 3 seconds
    setTimeout(() => {
      removeForm.removeChild(errorMessage);
    }, 3000);
  });
});