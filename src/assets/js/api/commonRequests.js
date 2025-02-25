import axios from 'axios';
import qs from 'qs';
import { serialize } from 'object-to-formdata';

export const commonRequest = (config) => {
  const { method, url } = config;

  return axios({
    url,
    method,
  });
};

export const getRequestWithParams = (config, query, opt = {}) => {
  const { method, url } = config;

  return axios({
    url,
    method,
    params: query,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    },
    ...opt,
  });
};

export const sendDataRequest = (config, data) => {
  const { method, url } = config;

  return axios({
    url,
    method,
    data: serialize(data, { indices: true }),
  });
};
