//Add Place
// Select the form and the inputs
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const imageInput = document.querySelector('#image');

// Add an event listener to the form
form.addEventListener('submit', function(event) {
  // Prevent the form from being submitted normally
  event.preventDefault();

  // Create a new FormData object
  const formData = new FormData();

  // Append the title and image to the FormData object
  formData.append('title', titleInput.value);
  formData.append('image', imageInput.files[0]);

  // Send a POST request to the server
  fetch('https://localhost:7241/places', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
});

//Remove Place
// Fetch data from the API
fetch('https://localhost:7241/places')
  .then(response => response.json())
  .then(data => {
    // Get the select element
    let select = document.querySelector('#removePlaceSelect');

    // Loop through the data
    data.forEach(item => {
      // Create a new option element
      let option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;

      // Append the option to the select
      select.appendChild(option);
    });
  })
  .catch(error => console.error('Error:', error));

// Select the form
const rform = document.querySelector('#remove rform');

// Add an event listener to the rform
rform.addEventListener('submit', function(event) {
  // Prevent the rform from being submitted normally
  event.preventDefault();

  // Get the selected option
  let selectedOption = document.querySelector('#removePlaceSelect option:checked');

  // Send a DELETE request to the server
  fetch(`https://localhost:7241/places/${selectedOption.value}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
});