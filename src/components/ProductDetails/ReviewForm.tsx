import styles from './ReviewForm.module.scss'

import StarRating from 'react-svg-star-rating'

import { MdOutlineClose } from 'react-icons/md'

import { reviewValidation } from '@components/Schemas/reviewValidation'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'

import createReview from '@components/helpers/createReview'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const ReviewForm = ({ product, setReviewModal }: any) => {
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

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <div onClick={() => setReviewModal(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={styles.header}>
          <h2>Create Review</h2>
          <button onClick={() => setReviewModal(false)}>
            <MdOutlineClose />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="rating">Overall rating</label>
            <StarRating
              containerClassName={styles.starRating}
              starClassName={styles.star}
              activeColor="#FFCC48"
              hoverColor="#FFCC48"
              initialRating={Number(formik.values.rating)}
              handleOnClick={(rating) => formik.setFieldValue('rating', rating)}
            />

            {formik.touched.rating && formik.errors.rating ? (
              <div className={styles.inputError}>{formik.errors.rating}</div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="image">
              Image <span>(optional)</span>
            </label>
            <span>Customers find images more helpful than text alone</span>
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
            <label htmlFor="title">Headline</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="What's most important to know?"
            />

            {formik.touched.title && formik.errors.title ? (
              <div className={styles.inputError}>{formik.errors.title}</div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder="What did you like or dislike?"
            />

            {formik.touched.description && formik.errors.description ? (
              <div className={styles.inputError}>
                {formik.errors.description}
              </div>
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
    </div>
  )
}

export default ReviewForm
