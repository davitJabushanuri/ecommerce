import * as yup from 'yup'

export const productValidation = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    price: yup
      .string()
      .required('Price is required')
      .matches(/^\d+$/, 'Price must be a number'),
    // image: yup.string().required('Image is required'),
    brand: yup.string().required('Brand is required'),
    category: yup.string().required('Category is required'),
    condition: yup.string().required('Condition is required'),
    stock: yup
      .string()
      .required('stock is required')
      .matches(/^\d+$/, 'stock must be a number'),
    shipping: yup
      .string()
      .required('Shipping is required')
      .matches(/^\d+$/, 'stock must be a number'),
  })
  .nullable()
