/* eslint-disable @next/next/no-img-element */
import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import styles from './products.module.scss'
import layout from '../layout.module.scss'
import fetchProducts from 'components/helpers/fetchProducts'
import { useQuery } from '@tanstack/react-query'

const Products = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(['products'], fetchProducts)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={layout.container}>
          <main>
            <div className={layout.navbarContainer}>
              <DashboardNavbar />
            </div>
            <div className={layout.headerContainer}>
              <DashboardHeader />
            </div>

            <div className={styles.content}>
              {products?.products.map((product: any) => {
                return (
                  <div key={product.id} className={styles.card}>
                    <div className={styles.imageContainer}>
                      <img src={product?.image} alt={product?.name} />
                    </div>
                    <div className={styles.info}>
                      <h3>{product?.name}</h3>
                      <p>{product?.description}</p>
                      <p>{product?.brand}</p>
                      <p>{product?.category}</p>
                      <p>{product?.price}</p>
                      <p>{product?.rating}</p>
                      <p>{product?.numReviews}</p>
                      <p>{product?.shipping}</p>
                      <p>{product?.stock}</p>
                      <p>{product?.isTrending ? 'Trending' : 'Not Trending'}</p>
                      <p>
                        {product?.isBestSeller
                          ? 'Best seller'
                          : 'Not best seller'}
                      </p>
                      <p>{product?.isNew ? 'New arrival' : 'Not new'}</p>
                      <p>{product?.isOnSale ? 'On sale' : 'Not on sale'}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </main>
    </div>
  )
}

export default Products
