/* eslint-disable @next/next/no-img-element */
import useCart from '@components/hooks/useCart'
import { IProduct } from '@ts/interfaces/types'
import { useState } from 'react'
import styles from './CartItem.module.scss'

import { FaTrash } from 'react-icons/fa'

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
        <p className={styles.price}>${product?.price}</p>
        <p>
          {product?.shipping === 0
            ? `Free shipping`
            : product?.shipping + ' ' + '$'}
        </p>
        <div className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
          <p>{product.stock === 0 ? 'Out of stock' : 'In stock'}</p>
        </div>

        <div className={styles.deleteContainer}>
          <div className={styles.quantity}>
            <button
              className={styles.minus}
              disabled={quantityState === 1}
              onClick={() => {
                setQuantity((prevQuantity) => prevQuantity - 1)
              }}
            >
              -
            </button>
            <input
              type="text"
              value={quantityState}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className={styles.plus}
              disabled={quantityState >= product?.stock}
              onClick={() => {
                setQuantity((prevQuantity) => prevQuantity + 1)
              }}
            >
              +
            </button>
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
            <span>
              <FaTrash />
            </span>
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
