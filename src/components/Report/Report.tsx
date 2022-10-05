import createReport from '@components/helpers/createReport'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import styles from './Report.module.scss'

import { MdOutlineClose } from 'react-icons/md'

const Report = ({ toggleModal, review }: any) => {
  const queryClient = useQueryClient()

  const formik = useFormik({
    initialValues: {
      message: '',
      description: '',
    },
    onSubmit: (values) => {
      mutation.mutate(values)
    },
  })

  const mutation = useMutation(
    (values: any) => createReport(review.id, values),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['product', review.productId])
        toggleModal(false)
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
    <div onClick={() => toggleModal(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={styles.header}>
          <h2>Create Review</h2>
          <button onClick={() => toggleModal(false)}>
            <MdOutlineClose />
          </button>
        </div>
        <p>
          If you find this content inappropriate and think it should be removed
          from the our site, let us know by clicking the button below. feel free
          to provide us with any additional details.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="message">
              Message <span>(optional)</span>
            </label>
            <input
              type="text"
              name="message"
              value={formik.values.message}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">
              Description <span>(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder="Provide additional details"
            />
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

export default Report
