import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAnswer } from '@ts/interfaces/types'

const useAnswer = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ message, questionId, userId, userName }: IAnswer) => {
      return createAnswer({ message, questionId, userId, userName })
    },
    {
      onSuccess: () => {
        console.log('success')
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

export default useAnswer

const createAnswer = async ({
  message,
  questionId,
  userId,
  userName,
}: IAnswer) => {
  try {
    const response = await fetch('/api/products/questions/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        questionId,
        userId,
        userName,
      }),
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
