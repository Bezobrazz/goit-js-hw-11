import axios from 'axios';

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
  const { data } = await pixabayApi.get('', {
    params: {
      q: query,
      page: page,
    },
  });

  return data;
}
