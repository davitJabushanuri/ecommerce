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
import fetchProducts from 'components/helpers/fetchProducts'

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
        <Header />
        <div className={styles.products}>
          {products &&
            products.map((product: IProduct) => {
              return <Card key={product.id} product={product} />
            })}
        </div>

        <Footer />
      </main>
    </div>
  )
}

export default Products
