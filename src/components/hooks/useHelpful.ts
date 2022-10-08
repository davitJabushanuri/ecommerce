import incrementHelpful from '@components/helpers/incrementHelpful'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useHelpful = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, userId, helpful }: any) => incrementHelpful(id, userId, helpful),
    {
      onSuccess: (id) => {
        console.log('success')
        queryClient.invalidateQueries(['product', id])
      },
      onError: () => {
        console.log('error')
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )
}

export default useHelpful
