import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = moment(dateStr);
  const isValid = date.isValid();
  if (!isValid) return '';
  return date.format(DATE_FORMAT);
};
