/* eslint-disable import/prefer-default-export */

export const capitalize = (str = '') => {
  if (!str || str.length === 0) return '';
  const strTrimed = str.trim();
  return `${strTrimed[0].toUpperCase()}${strTrimed.slice(1)}`;
};
