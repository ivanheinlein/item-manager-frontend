import { getApiUrl } from './getUrl';

const getUserUrl = getApiUrl('user');

export default {
  registration: {
    method: 'POST',
    url: getUserUrl('registration'),
  },
  login: {
    method: 'POST',
    url: getUserUrl('login'),
  },
  checkAuth: {
    method: 'GET',
    url: getUserUrl('auth'),
  },
  update: {
    method: 'POST',
    url: getUserUrl(),
  },
};
