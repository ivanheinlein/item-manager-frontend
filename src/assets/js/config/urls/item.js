import { getApiUrl } from './getUrl';

const getItemUrl = getApiUrl('item');

export default {
  all: {
    method: 'GET',
    url: getItemUrl(),
  },
  one: (id) => ({
    method: 'GET',
    url: getItemUrl(id),
  }),
  create: {
    method: 'POST',
    url: getItemUrl(),
  },
  update: (id) => ({
    method: 'PUT',
    url: getItemUrl(id),
  }),
  delete: (id) => ({
    method: 'DELETE',
    url: getItemUrl(id),
  }),
};
