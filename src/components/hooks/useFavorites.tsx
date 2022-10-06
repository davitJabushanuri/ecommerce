import toggleFavorites from '@components/helpers/toggleFavorites'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useFavorites = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ userId, productId, action }: any) => {
      return toggleFavorites(userId, productId, action)
    },
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['users'])
      },
      onError: (error: any) => {
        console.log(error.message)
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )
}

export default useFavorites
