import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const useProduct = (id: any) => {
  const queryClient = useQueryClient()

  return useQuery(
    ['product', id],
    async () => {
      return axios.get(`/api/products/${id}`).then((response) => {
        return response.data
      })
    },
    {
      initialData: () => {
        return queryClient
          .getQueryData(['products'])
          ?.find((product: any) => product.id === id)
      },
    }
  )
}

export default useProduct
