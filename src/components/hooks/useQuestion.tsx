import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IQuestion } from '@ts/interfaces/types'

const useQuestion = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ message, userName, productId, userId }: IQuestion) => {
      return createQuestion({ message, userName, userId, productId })
    },
    {
      onSuccess: () => {
        console.log('success', id)
        queryClient.invalidateQueries(['product', id])
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
