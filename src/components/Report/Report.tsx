import createReport from '@components/helpers/createReport'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import styles from './Report.module.scss'

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

  return (
    <div onClick={() => toggleModal(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <button onClick={() => toggleModal(false)}>cancel</button>
        <h1>Report</h1>
        <p>
          If you find this content inappropriate and think it should be removed
          from the our site, let us know by clicking the button below. feel free
          to provide us with any additional details.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="message">Message (optional)</label>
          <input
            type="text"
            name="message"
            value={formik.values.message}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Provide additional details"
          />

          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading
              ? 'Saving...'
              : mutation.isError
              ? 'Error!'
              : mutation.isSuccess
              ? 'Saved!'
              : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Report
