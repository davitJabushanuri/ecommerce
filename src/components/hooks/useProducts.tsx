import fetchProducts from '@components/helpers/fetchProducts'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useProducts = () => {
  const queryClient = useQueryClient()

  return useQuery(['products'], fetchProducts, {})
}

export default useProducts
