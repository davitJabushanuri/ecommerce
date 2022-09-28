import * as yup from 'yup'

export const reviewValidation = yup.object().shape({
  rating: yup
    .string()
    .required('Rating is required')
    .matches(/^[0-9]+$/, 'Rating must be a number'),
  image: yup.string(),
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Please add a meaningful title'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(100, 'Description must be at most 100 characters'),
})
