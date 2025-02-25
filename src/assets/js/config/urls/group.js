import { getApiUrl } from './getUrl';

const getGroupUrl = getApiUrl('group');

export default {
  group: {
    method: 'GET',
    url: getGroupUrl(),
  },
  addToGroup: {
    method: 'POST',
    url: getGroupUrl(),
  },
  confirmAddToGroup: {
    method: 'POST',
    url: getGroupUrl('confirm'),
  },
  deleteFromGroup: {
    method: 'DELETE',
    url: getGroupUrl(),
  },
  findUser: {
    method: 'GET',
    url: getGroupUrl('find'),
  },
};
