/* eslint-disable @next/next/no-img-element */
import useCart from '@components/hooks/useCart'
import { IProduct } from '@ts/interfaces/types'
import { useState } from 'react'
import styles from './CartItem.module.scss'

interface CartItemProps {
  userId: string
  productId: string
  product: IProduct
  quantity: number
}

const CartItem: React.FC<CartItemProps> = ({
  userId,
  productId,
  product,
  quantity,
}) => {
  const cartMutation = useCart('remove')

  const [quantityState, setQuantity] = useState(quantity || 1)

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product?.image || ''} alt="product" />
      </div>

      <div className={styles.info}>
        <h2>{product?.name}</h2>
        <p>${product?.price}</p>
        <p>
          {product?.shipping === 0
            ? `Free shipping`
            : product?.shipping + ' ' + '$'}
        </p>
        <div className={styles.inStock}>
          <p>{product.stock === 0 ? 'Out of stock' : 'In stock'}</p>
        </div>

        <div className={styles.quantity}>
          <button>-</button>
          <input
            type="text"
            value={quantityState}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button>+</button>
        </div>

        <button
          className={styles.delete}
          disabled={cartMutation.isLoading}
          onClick={() =>
            cartMutation.mutate({
              userId: userId,
              productId: productId,
              quantity: '1',
            })
          }
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default CartItem
