import styles from './Checkout.module.scss'

const Checkout = ({ cart }: any) => {
  console.log(cart)

  const itemsTotal = cart
    ? cart
        .map((item: any) => item.product.price * item.quantity)
        .reduce((a: any, b: any) => a + b, 0)
    : 0

  const shippingTotal = cart
    ? cart.reduce((a: any, b: any) => a + b.product.shipping, 0)
    : 0

  return (
    <div className={styles.container}>
      <h2>Order Summery</h2>
      <div className={styles.order}>
        <div className={styles.orderItem}>
          <p>Items:</p>
          <p>USD {itemsTotal}</p>
        </div>
        <div className={styles.orderItem}>
          <p>Shipping:</p>
          <p>{shippingTotal === 0 ? `Free` : `USD ` + shippingTotal}</p>
        </div>
        <div className={`${styles.orderItem} ${styles.orderTotal}`}>
          <p>Order Total:</p>
          <p>USD {itemsTotal + shippingTotal}</p>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.checkout}>Place your order</button>
          <p>
            By placing your order, you agree to our{' '}
            <a href="#">privacy notice</a> and <a href="#">conditions of use</a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
