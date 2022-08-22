import styles from './[slug].module.scss'

import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import useProductStore from '../../components/store/productStore'

import { IProduct } from 'ts/interfaces/db_interfaces'
import Card from 'components/Card/Card'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getProducts = async () => {
  const response = await axios.get('/api/products')
  return response.data
}

const Products = () => {
  const storeProducts = useProductStore((state: any) => state.products)
  console.log(storeProducts)

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(['products'], getProducts)

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <div className={styles.products}>
          {products &&
            products
              .filter((product: IProduct) => {
                switch (storeProducts) {
                  case 'New Arrivals':
                    return product.isNew
                  case 'Trending':
                    return product.isTrending

                  case 'On sale':
                    return product.isOnSale

                  default:
                    return product
                }
              })
              .map((product: IProduct) => {
                return <Card key={product.id} product={product} />
              })}
        </div>
        <Footer />
      </main>
    </div>
  )
}

async function getStaticProps() {}

export default Products
