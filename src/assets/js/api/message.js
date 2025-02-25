import URL from '@/assets/js/config/urls/message';
import { commonRequest, sendDataRequest } from './commonRequests';

export const axiosGetMessages = () => commonRequest(URL.all);
export const axiosCreateMessage = (data) => sendDataRequest(URL.create, data);
export const axiosDeleteMessage = (id) => commonRequest(URL.delete(id));
