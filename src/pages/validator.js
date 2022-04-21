import { isEmail } from 'validator';
import isEmpty from '../validation/is-empty';

export const validator = (data) => {
  const errors = {};
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (isEmpty(data.password2)) {
    errors.password2 = 'Password field is required';
  }
  if (data.password !== data.password2) {
    errors.password2 = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const loginValidator = (data) => {
  const errors = {};
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const passwordValidation = (password) => {
  let status = {
    one_lower: false,
    one_upper: false,
    one_num: false,
    one_sc: false,
    len: false,
    per: 0,
  };

  if (password.match('[a-z]+')) {
    status.per = status.per + 20;
    status.one_lower = true;
  }
  if (password.match('[A-Z]+')) {
    status.one_upper = true;
    status.per = status.per + 20;
  }

  if (password.match('[0-9]+')) {
    status.one_num = true;
    status.per = status.per + 20;
  }
  if (password.match("[!@#$%^&*(),.?':{}|<>]+")) {
    status.one_sc = true;
    status.per = status.per + 20;
  }
  if (password.length >= 8) {
    status.len = true;
    status.per = status.per + 20;
  }

  return status;
};
