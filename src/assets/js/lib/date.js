import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const formatDate = (date) => (date ? moment(date).format(DATE_FORMAT) : '');
