import axios from 'axios';
import { Notify } from 'notiflix';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '41222612-5bd8d04c7d8e61a5d7de078bd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

export async function getSearch(query, page) {
  try {
    const response = await pixabayApi.get('', {
      params: {
        q: query,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    Notify.failure('Error fetching data');
  }
}
