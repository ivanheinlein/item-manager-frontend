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
