import { mapValues, isEqual } from 'lodash';

const ARRAY_SEPAR = ',';

export const getQueryWithoutDefaults = (query, defQuery) => {
  const newQuery = {};

  Object.entries(query).forEach(([key, value]) => {
    if (!isEqual(query[key], defQuery[key])) newQuery[key] = value;
  });

  return newQuery;
};

const parseQueryArr = (v) => {
  if (typeof v !== 'string' || v.substr(v.length - 1) !== ARRAY_SEPAR) return v;
  return v.substr(0, v.length - 1).split(ARRAY_SEPAR);
};

const stringifyQueryArr = (v) => (Array.isArray(v) ? `${v.join(ARRAY_SEPAR)}${ARRAY_SEPAR}` : v);

export const stringifyQuery = (query) => mapValues((query), stringifyQueryArr);

export const parseQuery = (query) => mapValues((query), parseQueryArr);

export const getSringifyQuery = (query, defQuery) => stringifyQuery(
  getQueryWithoutDefaults(query, defQuery),
);
