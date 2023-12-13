import { getSearch } from './gallery-api.js';
import { Notify } from 'notiflix';
import { createMarkup } from './gallary-marcup.js';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
};
refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  const { value } = refs.form.elements.searchQuery;

  refs.button.style.display = 'none';

  if (!value) {
    Notify.failure('Please, input some text!');
    return;
  }

  refs.gallery.innerHTML = '';

  try {
    const searchData = await getSearch(value);

    const totalImg = searchData.totalHits;
    if (totalImg !== 0) {
      Notify.info(`Hooray! We found ${totalImg} images.`);
      refs.button.style.display = 'block';
    }

    if (searchData.total === 0) {
      Notify.failure("Unfortunately, we can't find any image");
    }

    const markup = createMarkup(searchData.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.error('Error in form submission:', error);
    Notify.failure('Error in form submission');
  }
}

refs.button.addEventListener('click', onButtonClick);

let page = 2;

async function onButtonClick() {
  try {
    const { value } = refs.form.elements.searchQuery;
    const searchData = await getSearch(value, page);

    if (searchData.hits.length === 0) {
      refs.button.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    const markup = createMarkup(searchData.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    page += 1;
  } catch (error) {
    console.error('Error in button click:', error);
    Notify.failure('Error in button click');
  }
}
