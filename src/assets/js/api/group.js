import URL from '@/assets/js/config/urls/group';
import { commonRequest, sendDataRequest, getRequestWithParams } from './commonRequests';

export const axiosGetGroup = () => commonRequest(URL.group);
export const axiosAddToGroup = (data) => sendDataRequest(URL.addToGroup, data);
export const axiosConfirmAddToGroup = (data) => sendDataRequest(URL.confirmAddToGroup, data);
export const axiosDeleteFromGroup = (data) => sendDataRequest(URL.deleteFromGroup, data);
export const axiosFindUser = (data) => getRequestWithParams(URL.findUser, data);
