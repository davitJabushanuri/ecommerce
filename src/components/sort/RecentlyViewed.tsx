import { useQuery } from '@tanstack/react-query'
import CardsContainer from 'components/CardsContainer/CardsContainer'
import fetchProducts from 'components/helpers/fetchProducts'
import { IProduct } from 'ts/interfaces/IProduct'

const RecentlyViewed = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetching,
    isPreviousData,
  } = useQuery<IProduct[]>(['products', 'recently-viewed'], () =>
    fetchProducts('recently-viewed')
  )

  return (
    <div>
      <CardsContainer
        products={products}
        title="recently Viewed"
        path="recently-viewed"
      />
    </div>
  )
}

export default RecentlyViewed
