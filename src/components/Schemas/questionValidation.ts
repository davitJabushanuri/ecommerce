import * as yup from 'yup'

export const questionValidation = yup
  .object()
  .shape({
    question: yup
      .string()
      .required('Question is required')
      .min(10, 'Question must be at least 10 characters'),
  })
  .nullable()

export const answerValidation = yup
  .object()
  .shape({
    message: yup
      .string()
      .required('Answer is required')
      .min(10, 'Please provide a meaningful answer'),
  })
  .nullable()
