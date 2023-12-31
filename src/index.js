import { getSearch } from './gallery-api.js';
import { Notify } from 'notiflix';
import { createMarkup } from './gallary-marcup.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
};

let page = 1;
let totalImg = 0;

function hideLoadMoreBtn() {
  refs.button.style.display = 'none';
}

function showLoadMoreBtn() {
  refs.button.style.display = 'block';
}

function updateLoadMoreBtnVisibility(page, totalImg) {
  const resultsPerPage = 40;
  const totalPages = Math.ceil(totalImg / resultsPerPage);

  if (page < totalPages) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();
  }
  if (page === totalPages) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  const { value } = refs.form.elements.searchQuery;

  hideLoadMoreBtn();

  if (!value) {
    Notify.failure('Please, input some text!');
    return;
  }
  page = 1;
  refs.gallery.innerHTML = '';

  try {
    const searchData = await getSearch(value);

    totalImg = searchData.totalHits;
    if (totalImg !== 0) {
      Notify.info(`Hooray! We found ${totalImg} images.`);
    }
    updateLoadMoreBtnVisibility(page, totalImg);

    if (searchData.total === 0) {
      Notify.failure("Unfortunately, we can't find any image");
    }

    const markup = createMarkup(searchData.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
  } catch (error) {
    console.error('Error in form submission:', error);
    Notify.failure('Error in form submission');
  }
}

refs.button.addEventListener('click', onButtonClick);

async function onButtonClick() {
  page += 1;

  try {
    const { value } = refs.form.elements.searchQuery;
    const searchData = await getSearch(value, page);

    totalImg = searchData.totalHits;

    if (searchData.hits.length === 0) {
      updateLoadMoreBtnVisibility(page, totalImg);
      return;
    }

    updateLoadMoreBtnVisibility(page, totalImg);

    const markup = createMarkup(searchData.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
  } catch (error) {
    console.error('Error in button click:', error);
    Notify.failure('Error in button click');
  }
}
