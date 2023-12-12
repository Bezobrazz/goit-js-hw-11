export function createCatMarkup(catData) {
  return `
    <h2 class="cat-card-title">${catData.breeds[0].name}</h2>
    <img class="cat-card-img" src="${catData.url}" alt="${catData.breeds[0].name}">
    <p class="cat-card-descr">${catData.breeds[0].description}</p>
    <p class="cat-card-temperament"><span class="cat-card-temp">Temperament:</span> ${catData.breeds[0].temperament}</p>
  `;
}
