/* eslint-disable @next/next/no-img-element */
import DashboardHeader from '@components/dashboard/DashboardHeader'
import DashboardNavbar from '@components/dashboard/DashboardNavbar'
import styles from './products.module.scss'
import layout from '../layout.module.scss'
import fetchProducts from 'components/helpers/fetchProducts'
import fetchProduct from 'components/helpers/fetchProduct'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const handleProductUpdate = async (product: any, field: string) => {
  product[field] = !product[field]

  try {
    const response = await fetch('/api/products/' + product.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...product,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

const handleProductDelete = (product: any) => {
  const { id } = product
  try {
    const response = fetch('/api/products/' + id, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }
}

const Products = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    ({ product, field, func }: any) => func(product, field && field),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['products'])
      },
      onError: (error: any) => {
        console.log(error)
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )

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
              {products?.map((product: any) => {
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
                      <p>price: {product?.price}$</p>
                      <p>rating: {product?.rating}</p>
                      <p>reviews: {product?.numReviews}</p>
                      <p>shipping: {product?.shipping}</p>
                      <p>stock: {product?.stock}</p>
                      <p>{product?.isTrending ? 'Trending' : 'Not Trending'}</p>
                      <button
                        disabled={mutation.isLoading}
                        onClick={() =>
                          mutation.mutate({
                            product,
                            field: 'isTrending',
                            func: handleProductUpdate,
                          })
                        }
                      >
                        mark as trending
                      </button>
                      <p>
                        {product?.isBestSeller
                          ? 'Best seller'
                          : 'Not best seller'}
                      </p>
                      <button
                        disabled={mutation.isLoading}
                        onClick={() =>
                          mutation.mutate({
                            product,
                            field: 'isBestSeller',
                            func: handleProductUpdate,
                          })
                        }
                      >
                        mark as Best seller
                      </button>
                      <p>{product?.isNew ? 'New arrival' : 'Not new'}</p>
                      <button
                        disabled={mutation.isLoading}
                        onClick={() =>
                          mutation.mutate({
                            product,
                            field: 'isNew',
                            func: handleProductUpdate,
                          })
                        }
                      >
                        Mark as new
                      </button>
                      <p>{product?.isOnSale ? 'On sale' : 'Not on sale'}</p>
                      <button
                        disabled={mutation.isLoading}
                        onClick={() =>
                          mutation.mutate({
                            product,
                            field: 'isOnSale',
                            func: handleProductUpdate,
                          })
                        }
                      >
                        mark as on sale
                      </button>
                      <div>
                        <button
                          disabled={mutation.isLoading}
                          onClick={() =>
                            mutation.mutate({
                              product,
                              field: '',
                              func: handleProductDelete,
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
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
