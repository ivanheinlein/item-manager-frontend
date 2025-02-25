import URLS from '@/assets/js/config/urls/user';
import { commonRequest, sendDataRequest } from './commonRequests';

export const axiosRgistration = (data) => sendDataRequest(URLS.registration, data);
export const axiosLogin = (data) => sendDataRequest(URLS.login, data);
export const axiosCheckAuth = () => commonRequest(URLS.checkAuth);
export const axiosUserUpdate = (data) => sendDataRequest(URLS.update, data);
