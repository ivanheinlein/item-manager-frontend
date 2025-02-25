import URL from '@/assets/js/config/urls/item';
import { commonRequest, getRequestWithParams, sendDataRequest } from './commonRequests';

export const axiosGetItem = (id) => commonRequest(URL.one(id));
export const axiosGetItems = (opt) => getRequestWithParams(URL.all, opt);
export const axiosCreateItem = (data) => sendDataRequest(URL.create, data);
export const axiosUpdateItem = (id, data) => sendDataRequest(URL.update(id), data);
export const axiosDeleteItem = (id) => commonRequest(URL.delete(id));
