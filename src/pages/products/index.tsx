import styles from './[slug].module.scss'

import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import useProductStore from '../../components/store/productStore'

import { IProduct } from 'ts/interfaces/db_interfaces'
import Card from 'components/Card/Card'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

async function fetchProducts(page = 1) {
  const { data } = await axios.get(
    'http://localhost:3000/api/products?page=' + page
  )
  return data
}

const Products = () => {
  const storeProducts = useProductStore((state: any) => state.products)

  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData,
  } = useQuery(['products', page], () => fetchProducts(page), {
    keepPreviousData: true,
    staleTime: 5000,
  })

  useEffect(() => {
    if (products?.hasMore) {
      queryClient.prefetchQuery(['products', page + 1], () =>
        fetchProducts(page + 1)
      )
    }
  }, [products, page, queryClient])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <div className={styles.products}>
          {products &&
            products?.products.map((product) => {
              return <Card key={product.id} product={product} />
            })}
        </div>
        <div>Current Page: {page}</div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            setPage((old) => (products?.hasMore ? old + 1 : old))
          }}
          disabled={isPreviousData || !products?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}
        <Footer />
      </main>
    </div>
  )
}

export default Products
