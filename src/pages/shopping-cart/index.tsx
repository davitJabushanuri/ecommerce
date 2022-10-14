import styles from './cart.module.scss'

import Header from '@components/Header/Header'
import Cart from '@components/Cart/Cart'

const ShoppingCart = () => {
  return (
    <div className={styles.container}>
      <main>
        <Header />
        <Cart />
      </main>
    </div>
  )
}

export default ShoppingCart
