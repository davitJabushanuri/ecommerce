/* eslint-disable @next/next/no-img-element */
import useCart from '@components/hooks/useCart'
import { IProduct } from '@ts/interfaces/types'
import { useState } from 'react'
import styles from './CartItem.module.scss'

import { FaTrash } from 'react-icons/fa'
import useQuantity from '@components/hooks/useQuantity'

interface CartItemProps {
  userId: string
  cartItemId: string
  product: IProduct
  quantity: number
}

const CartItem: React.FC<CartItemProps> = ({
  userId,
  cartItemId,
  product,
  quantity,
}) => {
  const cartMutation = useCart('remove')
  const quantityMutation = useQuantity()

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product?.image || ''} alt="product" />
      </div>

      <div className={styles.info}>
        <h2>{product?.name}</h2>
        <div className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
          <p>{product.stock === 0 ? 'Out of stock' : 'In stock'}</p>
        </div>
        <p className={styles.price}>${product?.price}</p>
        <p>
          {product?.shipping === 0
            ? `Free shipping`
            : 'Shipping: ' + '$' + product?.shipping}
        </p>

        <div className={styles.deleteContainer}>
          <div className={styles.quantity}>
            <button
              className={styles.minus}
              disabled={quantity === 1}
              onClick={() => {
                quantityMutation.mutate({
                  id: cartItemId,
                  quantity: quantity - 1,
                })
              }}
            >
              -
            </button>
            <input
              type="text"
              value={quantity || 1}
              onBlur={(e) => {
                quantityMutation.mutate({
                  id: cartItemId,
                  quantity: e.target.value,
                })
              }}
            />
            <button
              className={styles.plus}
              disabled={quantity >= product?.stock}
              onClick={() => {
                quantityMutation.mutate({
                  id: cartItemId,
                  quantity: quantity + 1,
                })
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
                productId: cartItemId,
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
