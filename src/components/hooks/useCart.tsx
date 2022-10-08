import addToCart from '@components/helpers/addToCart'
import removeFromCart from '@components/helpers/removeFromCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCart = (action: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ userId, productId, quantity }: any) => {
      return action === 'add'
        ? addToCart(userId, productId, quantity)
        : removeFromCart(productId)
    },
    {
      onSuccess: () => {
        console.log('success')
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
