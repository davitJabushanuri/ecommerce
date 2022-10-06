import addToCart from '@components/helpers/addToCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCart = (id: any) => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ userId, productId, quantity }: any) => {
      return addToCart(userId, productId, quantity)
    },
    {
      onSuccess: (productId) => {
        console.log('success', id)
        queryClient.invalidateQueries(['users'])
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

export default useCart
