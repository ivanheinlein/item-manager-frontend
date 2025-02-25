export const pad = (num) => (parseInt(num, 10) > 9 ? `${num}` : `0${num}`);

export const capitalize = (str = '') => (str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '');

export const sum = (arr) => arr.reduce((acc, v) => acc + v, 0);

export const average = (arr) => sum(arr) / arr.length;

export const mix = (x, y, a) => x * (1 - a) + y * a;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getImgFromFile = (file) => URL.createObjectURL(file);

export const getEmptyUser = () => ({
  avatar: null,
  name: '',
  surname: '',
  email: '',
  birthday: '',
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
});

export const getEmptyUserErrors = () => ({
  avatar: '',
  name: '',
  surname: '',
  email: '',
  birthday: '',
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
});

export const getEmptyItem = () => ({
  id: null,
  name: '',
  description: '',
  image: null,
  categories: [],
});

export const getEmptyItemErrors = () => ({
  name: '',
  description: '',
  image: '',
  categories: '',
});

export const getEmptyCategory = () => ({
  id: null,
  name: '',
  description: '',
  image: null,
  color: '',
});

export const getEmptyCategoryErrors = () => ({
  name: '',
  description: '',
  image: '',
  color: '',
});

export const converErrorArrToObj = (errArr) => {
  const errorObj = {};

  errArr.forEach((err) => {
    if (!Array.isArray(errorObj[err.param])) errorObj[err.param] = [];
    errorObj[err.param].push(err.msg);
  });

  return Object.fromEntries(Object.entries(errorObj).map(([key, val]) => [key, val.join('; ')]));
};
