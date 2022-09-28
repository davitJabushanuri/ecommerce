import styles from './ReviewForm.module.scss'

import { reviewValidation } from '@components/Schemas/reviewValidation'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'

import createReview from '@components/helpers/createReview'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const ReviewForm = ({ product }: any) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formik = useFormik({
    initialValues: {
      rating: '',
      image: '',
      title: '',
      description: '',
    },

    validationSchema: reviewValidation,
    onSubmit: (values) => {
      if (session)
        mutation.mutate({
          values,
          userEmail: session?.user.email,
          productId: product.id,
        })
    },
  })

  const mutation = useMutation(
    ({ values, userEmail, productId }: any) =>
      createReview(values, userEmail, productId),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['product', product.id])
        formik.resetForm()
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )

  return (
    <div className={styles.container}>
      <h2>Leave a review</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            name="rating"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
          />

          {formik.touched.rating && formik.errors.rating ? (
            <div className={styles.inputError}>{formik.errors.rating}</div>
          ) : null}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="image">image</label>
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

        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />

          {formik.touched.title && formik.errors.title ? (
            <div className={styles.inputError}>{formik.errors.title}</div>
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

        <div className={styles.buttonContainer}>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading
              ? 'Saving...'
              : mutation.isError
              ? 'Error!'
              : mutation.isSuccess
              ? 'Saved!'
              : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm