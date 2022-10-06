import createReview from '@components/helpers/createReview'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useReview = (id: any, formik: any, setReviewModal: any) => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ values, userId, productId }: any) =>
      createReview(values, userId, productId),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['product', id])
        formik.resetForm()
        setReviewModal(false)
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )
}

export default useReview
