/* eslint-disable @next/next/no-img-element */
import styles from './ProductForm.module.scss'

import { useFormik, Form, Field, ErrorMessage } from 'formik'
import { productValidation } from 'components/Schemas/productValidation'
import { useRef, useState } from 'react'
import Router from 'next/router'

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
  const imageRef = useRef<HTMLInputElement>(null)
  const [displayImage, setDisplayImage] = useState<string>('')
  const [formDataImage, setFormDataImage] = useState('')

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
      handleSubmit(values)
    },
  })

  const uploadImage = (e: any) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      setFormDataImage(file)
      formik.setFieldValue('image', file)

      const reader: any = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        setDisplayImage(reader.result)
      }
    }
  }

  const removeImage = () => {
    formik.setFieldValue('image', '')
    setDisplayImage('')
    setFormDataImage('')
  }

  const handleSubmit = async (data: any) => {
    const formData = new FormData()
    for (var key in data) {
      formData.append(key, data[key])
    }
    formData.set('image', formDataImage)

    // submit data to backend
    const response = await fetch('/api/products/create', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          setDisplayImage('')
          setFormDataImage('')
          formik.resetForm()
          Router.push('/')
          return res.json()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
        </div>

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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
