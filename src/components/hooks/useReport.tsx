import createReport from '@components/helpers/createReport'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useReport = (toggleModal: any, productId: any) => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ values, reviewId }: any) => createReport(reviewId, values),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['product', productId])
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
}

export default useReport
