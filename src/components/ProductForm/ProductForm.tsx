import styles from './ProductForm.module.scss'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { productValidation } from 'components/Schemas/productValidation'

interface IProductValues {
  name: string
  description: string
  category: string
  condition: string
  image: string
  brand: string
  price: string
  stock: string
  shipping: string
}

const ProductForm = () => {
  const initialValues: IProductValues = {
    name: '',
    description: '',
    category: '',
    condition: '',
    image: '',
    brand: '',
    price: '',
    stock: '',
    shipping: '',
  }

  const handleSubmit = async (data: IProductValues) => {
    // submit data to backend
    const response = await fetch('/api/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={productValidation}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          handleSubmit(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Title</label>
              <Field
                type="text"
                name="name"
                className={styles.input}
                placeholder="Iphone 12 pro max"
              />
              <ErrorMessage
                name="name"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                as="textarea"
                className={styles.input}
                placeholder="best phone ever"
              />
              <ErrorMessage
                name="description"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="category">Category</label>
              <Field
                type="text"
                name="category"
                className={styles.input}
                placeholder="Phones"
              />
              <ErrorMessage
                name="category"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.selectGroup}>
              <label htmlFor="condition">Condition</label>
              <Field
                name="condition"
                as="select"
                className={styles.select}
                placeholder="dfs"
              >
                <option className={styles.option} value="new">
                  New
                </option>
                <option className={styles.option} value="open-box">
                  Open box
                </option>
                <option className={styles.option} value="used">
                  Used
                </option>
                <option className={styles.option} value="refurbished">
                  Refurbished
                </option>
              </Field>
              <ErrorMessage
                name="condition"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="image">Image</label>
              <Field
                type="text"
                name="image"
                className={styles.input}
                placeholder="pexels.com/iphone12"
              />
              <ErrorMessage
                name="image"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="brand">Brand</label>
              <Field
                type="text"
                name="brand"
                className={styles.input}
                placeholder="Apple"
              />
              <ErrorMessage
                name="brand"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="price">Price</label>
              <Field
                type="text"
                name="price"
                className={styles.input}
                placeholder="990"
              />
              <ErrorMessage
                name="price"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="stock">Quantity</label>
              <Field
                type="text"
                name="stock"
                className={styles.input}
                placeholder="1"
              />
              <ErrorMessage
                name="stock"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="shipping">Shipping</label>
              <Field
                type="text"
                name="shipping"
                className={styles.input}
                placeholder="20"
              />
              <ErrorMessage
                name="shipping"
                className={styles.inputError}
                component="div"
              />
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProductForm
