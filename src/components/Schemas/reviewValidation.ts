import * as yup from 'yup'

export const reviewValidation = yup.object().shape({
  rating: yup
    .string()
    .required('Rating is required')
    .matches(/^[0-9]+$/, 'Rating must be a number'),
  comment: yup
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(100, 'Comment must be at most 100 characters'),
})
