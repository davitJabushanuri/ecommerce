import { useQuery } from '@tanstack/react-query'
import CardsContainer from 'components/CardsContainer/CardsContainer'
import fetchProducts from 'components/helpers/fetchProducts'
import { IProduct } from 'ts/interfaces/IProduct'

const Trending = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetching,
    isPreviousData,
  } = useQuery<IProduct[]>(['products', 'trending'], () =>
    fetchProducts('trending')
  )

  return (
    <div>
      <CardsContainer products={products} title="Trending" path="trending" />
    </div>
  )
}

export default Trending
