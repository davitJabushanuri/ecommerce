/* eslint-disable @next/next/no-img-element */
import styles from './ProductForm.module.scss'

import { useFormik } from 'formik'
import { productValidation } from 'components/Schemas/productValidation'
import { useMutation } from '@tanstack/react-query'
import postData from '@components/helpers/postData'
import { IPostProduct } from '@ts/interfaces/types'

interface IProductValues {
  name: string
  description: string
  category: string
  condition: string
  brand: string
  price: string
  stock: string
  shipping: string
  image: string
}

const ProductForm = () => {
  const initialValues: IProductValues = {
    name: '',
    description: '',
    category: '',
    condition: '',
    brand: '',
    price: '',
    stock: '',
    shipping: '',
    image: '',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productValidation,
    onSubmit: (values) => {
      console.log(values)
      mutate(values)
    },
  })

  // const uploadImage = (e: any) => {
  //   if (e.target.files[0]) {
  //     const file = e.target.files[0]
  //     setFormDataImage(file)

  //     const reader: any = new FileReader()
  //     reader.readAsDataURL(file)

  //     reader.onload = (readerEvent: any) => {
  //       formik.setFieldValue('image', readerEvent.target.result)
  //       setDisplayImage(readerEvent.target.result)
  //     }
  //   }
  // }

  // const removeImage = () => {
  //   formik.setFieldValue('image', '')
  //   setDisplayImage('')
  //   setFormDataImage('')
  // }

  const { mutate, isError, isIdle, isLoading, isSuccess } = useMutation(
    (data: IPostProduct) => postData(data),
    {
      onSuccess: () => {
        console.log('success')
      },
      onError: () => {
        console.log('error')
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />

          {formik.touched.name && formik.errors.name ? (
            <div className={styles.inputError}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.inputError}>{formik.errors.description}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          />
          {formik.touched.category && formik.errors.category ? (
            <div className={styles.inputError}>{formik.errors.category}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="condition">Condition</label>
          <input
            id="condition"
            name="condition"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.condition}
          />
          {formik.touched.condition && formik.errors.condition ? (
            <div className={styles.inputError}>{formik.errors.condition}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="Image">Image</label>
          <input
            id="image"
            name="image"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className={styles.inputError}>{formik.errors.image}</div>
          ) : null}
        </div>

        {/* <div className={styles.inputGroup}>
          <button type="button" onClick={() => imageRef.current?.click()}>
            Upload image
          </button>
          <button type="button" onClick={removeImage}>
            remove image
          </button>
          <input
            style={{ display: 'none' }}
            ref={imageRef}
            type="file"
            onChange={uploadImage}
            accept="image/*"
            multiple={false}
          />
          {displayImage && <img src={displayImage} alt="product" />}
          {formik.touched.image && formik.errors.image ? (
            <div className={styles.inputError}>{formik.errors.image}</div>
          ) : null}
        </div> */}

        <div className={styles.inputGroup}>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            name="brand"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
          />
          {formik.touched.brand && formik.errors.brand ? (
            <div className={styles.inputError}>{formik.errors.brand}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className={styles.inputError}>{formik.errors.price}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
          />
          {formik.touched.stock && formik.errors.stock ? (
            <div className={styles.inputError}>{formik.errors.stock}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="shipping">Shipping</label>
          <input
            id="shipping"
            name="shipping"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shipping}
          />
          {formik.touched.shipping && formik.errors.shipping ? (
            <div className={styles.inputError}>{formik.errors.shipping}</div>
          ) : null}
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" disabled={isLoading}>
            {isLoading
              ? 'Saving...'
              : isError
              ? 'Error!'
              : isSuccess
              ? 'Saved!'
              : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
