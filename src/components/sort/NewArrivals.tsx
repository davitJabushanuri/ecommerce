import { useQuery } from '@tanstack/react-query'
import CardsContainer from 'components/CardsContainer/CardsContainer'
import fetchProducts from 'components/helpers/fetchProducts'
import { IProduct } from 'ts/interfaces/IProduct'

const NewArrivals = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetching,
    isPreviousData,
  } = useQuery<IProduct[]>(['products', 'new-arrivals'], () =>
    fetchProducts('new-arrivals')
  )

  return (
    <div>
      <CardsContainer
        products={products}
        title="New Arrivals"
        path="new-arrivals"
      />
    </div>
  )
}

export default NewArrivals
