import * as Yup from 'yup';

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegex = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;
const enRegex = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const uaRegex = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

export const registerSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Enter a valid Email'),
  password: Yup.string()
    .required('Password is required')
    .matches(passwordRegex, 'Enter a valid Password'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegex, 'Enter a valid Email'),
  password: Yup.string()
    .required('Password is required')
    .matches(passwordRegex, 'Enter a valid Password'),
});

export const wordSchema = Yup.object({
  en: Yup.string()
    .required('English word is required')
    .matches(enRegex, 'Enter a valid English word'),
  ua: Yup.string()
    .required('Ukrainian word is required')
    .matches(uaRegex, 'Enter a valid Ukrainian word'),
});

export const addWordSchema = Yup.object({
  category: Yup.string().required('Select a category'),
  isIrregular: Yup.boolean().when('category', {
    is: 'verb',
    then: (schema) => schema.required('Select verb type'),
  }),
  en: Yup.string()
    .required('English word is required')
    .matches(enRegex, 'Enter a valid English word'),
  ua: Yup.string()
    .required('Ukrainian word is required')
    .matches(uaRegex, 'Enter a valid Ukrainian word'),
});
