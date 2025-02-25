import URL from '@/assets/js/config/urls/category';
import { commonRequest, sendDataRequest } from './commonRequests';

export const axiosGetCategories = () => commonRequest(URL.all);
export const axiosGetCategory = (id) => commonRequest(URL.one(id));
export const axiosCreateCategory = (data) => sendDataRequest(URL.create, data);
export const axiosUpdateCategory = (id, data) => sendDataRequest(URL.update(id), data);
export const axiosDeleteCategory = (id) => commonRequest(URL.delete(id));
