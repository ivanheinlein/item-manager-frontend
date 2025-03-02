export const converErrorArrToObj = (errArr) => {
  if (!Array.isArray(errArr)) return {};

  const errorObj = {};

  errArr.forEach((err) => {
    if (!Array.isArray(errorObj[err.param])) errorObj[err.param] = [];
    errorObj[err.param].push(err.msg);
  });

  return Object.fromEntries(Object.entries(errorObj).map(([key, val]) => [key, val.join('; ')]));
};
