import { useMutation, useQueryClient } from '@tanstack/react-query'

interface IQuestion {
  message: string
  userName: string
  userId: string
  productId: string
}

const useQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ message, userName, productId, userId }: IQuestion) =>
      createQuestion({ message, userName, userId, productId }),
    {
      onSuccess: (productId) => {
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

export default useQuestion

const createQuestion = async ({
  message,
  userName,
  productId,
  userId,
}: IQuestion) => {
  try {
    const response = await fetch('/api/products/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userName,
        productId,
        userId,
      }),
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
