import { getApiUrl } from './getUrl';

const getMessageUrl = getApiUrl('message');

export default {
  all: {
    method: 'GET',
    url: getMessageUrl(),
  },
  create: {
    method: 'POST',
    url: getMessageUrl(),
  },
  delete: (id) => ({
    method: 'DELETE',
    url: getMessageUrl(id),
  }),
};
