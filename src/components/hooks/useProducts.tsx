import fetchProducts from '@components/helpers/fetchProducts'
import { useQuery } from '@tanstack/react-query'

const useProducts = () => {
  return useQuery(['products'], fetchProducts)
}

export default useProducts
