import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useProduct = (id: any) => {
  return useQuery(['product', id], async () => {
    return axios.get(`/api/products/${id}`).then((response) => {
      return response.data
    })
  })
}

export default useProduct
