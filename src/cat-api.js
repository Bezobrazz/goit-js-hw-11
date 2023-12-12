import { showLoader } from './index.js';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  const api_key =
    'live_CyIt46k5XXDF4CTRz4nbFjJVgzCAvMjg8oVWL8KZaKNtdiYNz2FSbLVVVYPhK1dp';
  showLoader();

  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const url = 'https://api.thecatapi.com/v1/images/search';
  const api_key =
    'live_CyIt46k5XXDF4CTRz4nbFjJVgzCAvMjg8oVWL8KZaKNtdiYNz2FSbLVVVYPhK1dp';

  showLoader();

  const queryParams = new URLSearchParams({
    breed_ids: breedId,
  });

  return fetch(`${url}?${queryParams.toString()}`, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}
