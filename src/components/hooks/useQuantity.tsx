import { useMutation, useQueryClient } from '@tanstack/react-query'

const useQuantity = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, quantity }: any) => {
      return setQuantity(id, quantity)
    },
    {
      onSuccess: () => {
        console.log('quantity updated')
        queryClient.invalidateQueries(['users'])
      },
      onError: (error) => {
        console.log('error')
        alert('Something went wrong')
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )
}

export default useQuantity

const setQuantity = async (id: string, quantity: number) => {
  try {
    const response = await fetch(`/api/products/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, quantity }),
    })

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
