import styles from './cart.module.scss'

import Header from '@components/Header/Header'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Card from '@components/Card/Card'
import removeFromCart from '@components/helpers/removeFromCart'
import useUser from '@components/hooks/useUser'
import useCart from '@components/hooks/useCart'

const ShoppingCart = () => {
  const user = useUser()
  const cartMutation = useCart('remove')

  if (!user) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <h1>Shopping Cart</h1>

        <div className={styles.cart}>
          {user?.cartItems?.map((cartItem: any) => {
            return (
              <div key={cartItem.id}>
                <Card product={cartItem.product} />
                <button
                  disabled={cartMutation.isLoading}
                  onClick={() =>
                    cartMutation.mutate({
                      userId: user.id,
                      productId: cartItem.id,
                      quantity: '1',
                    })
                  }
                >
                  remove
                </button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default ShoppingCart
