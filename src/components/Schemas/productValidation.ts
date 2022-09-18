import * as yup from 'yup'

export const productValidation = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  image: yup.string().required('Image is required'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  stock: yup.number().required('Count in stock is required'),
  shipping: yup.number().required('Shipping is required'),
})
