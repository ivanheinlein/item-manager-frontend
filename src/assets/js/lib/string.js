export const capitalize = (str = '') => {
  if (!str || str.length === 0) return '';
  str = str.trim();
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
