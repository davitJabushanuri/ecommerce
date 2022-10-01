import styles from './product.module.scss'

import Header from '@components/Header/Header'
import ProductDetails from 'components/ProductDetails/ProductDetails'
import { NextPage } from 'next'
import { IProduct } from '../../ts/interfaces/types'

const ProductPage: NextPage<IProduct> = () => {
  return (
    <div className={styles.container}>
      <main>
        <Header />
        <ProductDetails />
      </main>
    </div>
  )
}

export default ProductPage
