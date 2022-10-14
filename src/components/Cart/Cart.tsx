import useUser from '@components/hooks/useUser'
import styles from './Cart.module.scss'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = () => {
  const user = useUser()

  return (
    <div className={styles.container}>
      {/* CART */}
      <div className={styles.cart}>
        {user &&
          user?.cartItems?.map((cartItem: any) => {
            return (
              <div key={cartItem.id}>
                <CartItem
                  userId={user?.id}
                  cartItemId={cartItem?.id}
                  product={cartItem?.product}
                  quantity={cartItem?.quantity}
                />
              </div>
            )
          })}
      </div>

      {/* CHECKOUT */}
      <div className={styles.checkout}>
        <Checkout />
      </div>
    </div>
  )
}

export default Cart
