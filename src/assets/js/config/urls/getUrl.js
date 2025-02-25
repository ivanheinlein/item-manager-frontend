const SERVER_URL = process.env.VUE_APP_SERVER_URL;
const SERVER_IMAGES_PATH = process.env.VUE_APP_SERVER_IMAGES_PATH;
const getPath = (path) => (path ? `/${path}` : '');
const getApiUrl = (prefix = '') => (path = '') => `${SERVER_URL}/api/${prefix}${getPath(path)}`;

module.exports = {
  SERVER_URL,
  SERVER_IMAGES_PATH,
  getApiUrl,
};
