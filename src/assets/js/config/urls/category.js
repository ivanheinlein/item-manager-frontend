import { getApiUrl } from './getUrl';

const getCategoryUrl = getApiUrl('category');

export default {
  all: {
    method: 'GET',
    url: getCategoryUrl(),
  },
  one: (id) => ({
    method: 'GET',
    url: getCategoryUrl(id),
  }),
  create: {
    method: 'POST',
    url: getCategoryUrl(),
  },
  update: (id) => ({
    method: 'PUT',
    url: getCategoryUrl(id),
  }),
  delete: (id) => ({
    method: 'DELETE',
    url: getCategoryUrl(id),
  }),
};
