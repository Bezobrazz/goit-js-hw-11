import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { createCatMarkup } from './cat-markup.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-card');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

export function showLoader() {
  loader.style.display = 'block';
  catInfoDiv.style.display = 'none';
  error.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showCatInfo() {
  catInfoDiv.style.display = 'block';
}

function showError() {
  error.style.display = 'block';
}

function generateBreedOptions(data) {
  return data.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });
}

fetchBreeds()
  .then(data => {
    showCatInfo();
    const breedOptions = generateBreedOptions(data);
    breedSelect.append(...breedOptions);
  })
  .catch(error => {
    showError();
    console.error(error);
  })
  .finally(() => {
    hideLoader();
  });

breedSelect.addEventListener('change', onBreedSelectChange);

function onBreedSelectChange(e) {
  fetchCatByBreed(e.target.value)
    .then(data => {
      showCatInfo();
      catInfoDiv.innerHTML = createCatMarkup(data[0]);
    })
    .catch(error => {
      showError();
      console.error('Error fetching cat data:', error);
      throw error;
    })
    .finally(() => {
      hideLoader();
    });
}
