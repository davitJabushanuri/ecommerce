import styles from './[slug].module.scss'

import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import useProductStore from '../../components/store/productStore'

import { IProduct } from 'ts/interfaces/IProduct'
import Card from 'components/Card/Card'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import fetchPaginatedProducts from 'components/helpers/fetchPaginatedProducts'

import { useRouter } from 'next/router'

const Products = () => {
  const productPath = useProductStore((state: any) => state.productPath)

  const queryClient = useQueryClient()
  const [page, setPage] = useState(0)

  const router = useRouter()
  const { slug } = router.query

  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData,
  } = useQuery(['products', page], () => fetchPaginatedProducts(slug, page), {
    keepPreviousData: true,
    staleTime: 0,
  })

  useEffect(() => {
    if (products?.hasMore) {
      queryClient.prefetchQuery(['products', page + 1], () =>
        fetchPaginatedProducts(slug, page + 1)
      )
    }
  }, [products, page, queryClient, slug])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <h1>{productPath}</h1>
        <div className={styles.products}>
          {products &&
            products.map((product: IProduct) => {
              return <Card key={product.id} product={product} />
            })}
        </div>
        <div>Current Page: {page + 1}</div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
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
