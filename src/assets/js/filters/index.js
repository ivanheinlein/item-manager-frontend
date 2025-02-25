import { SERVER_URL, SERVER_IMAGES_PATH } from '@/assets/js/config/urls/getUrl';

export default {
  parseDate(val) {
    if (!val) return '';
    return new Date(val).toLocaleDateString();
  },
  serverImgPath(val) {
    return `${SERVER_URL}${SERVER_IMAGES_PATH}/${val}`;
  },
};
