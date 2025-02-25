const EMAIL_REG = /\S+@\S+\.\S+/;
const required = (v) => !!v || 'Field is required';

export const checkRule = (val, rules) => {
  const errorMsgs = rules.map((rule) => rule(val)).filter((v) => typeof v === 'string');
  const [firstMsg] = errorMsgs;
  return firstMsg || '';
};

export default {
  required: [required],
  name: [required, (v) => v.length > 3 || 'Name must be more than 3 characters long'],
  email: [required, (v) => EMAIL_REG.test(v) || 'Email should be in the format "test@test.com"'],
  password: [required, (v) => v.length >= 6 || 'Password must be more than 5 symbols'],
};
