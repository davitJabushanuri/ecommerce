import addToCart from '@components/helpers/addToCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useUser from './useUser'

const useCart = (productId: any, quantity: any) => {
  const queryClient = useQueryClient()
  const user = useUser()
  const userId = user?.id
  console.log(userId)
  console.log(user)

  return useMutation(
    ({ productId, quantity }: any) => addToCart(userId, productId, quantity),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['product', productId])
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
