import { useQuery } from '@tanstack/react-query'
import CardsContainer from 'components/CardsContainer/CardsContainer'
import fetchProducts from 'components/helpers/fetchProducts'
import { IProduct } from 'ts/interfaces/IProduct'

const OnSale = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetching,
    isPreviousData,
  } = useQuery<IProduct[]>(['products', 'on-sale'], () =>
    fetchProducts('on-sale')
  )

  return (
    <div>
      <CardsContainer products={products} title="On sale" path="on-sale" />
    </div>
  )
}

export default OnSale
