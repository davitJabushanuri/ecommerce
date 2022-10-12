import { useFormik } from 'formik'
import { useEffect } from 'react'
import styles from './Report.module.scss'

import { MdOutlineClose } from 'react-icons/md'
import useReport from '@components/hooks/useReport'
import useAuth from '@components/hooks/useAuth'

const Report = ({ toggleModal, review }: any) => {
  const session = useAuth()
  const formik = useFormik({
    initialValues: {
      message: '',
      description: '',
    },
    onSubmit: (values) => {
      if (session)
        reportMutation.mutate({
          values: values,
          reviewId: review.id,
        })

      formik.resetForm()
    },
  })

  const reportMutation = useReport(toggleModal, review.productId)

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
            <button type="submit" disabled={reportMutation.isLoading}>
              {reportMutation.isLoading
                ? 'Saving...'
                : reportMutation.isError
                ? 'Error!'
                : reportMutation.isSuccess
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
