/* eslint-disable @next/next/no-img-element */
import styles from './ProductDetails.module.scss'
import {
  AiFillStar,
  AiFillHeart,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineHeart,
} from 'react-icons/ai'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSession } from 'next-auth/react'

import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import Ratings from './Ratings'
import addToFavorites from '@components/helpers/addToFavorites'
import addToCart from '@components/helpers/addToCart'
import removeFromFavorites from '@components/helpers/removeFromFavorites'
import useProduct from '@components/hooks/useProduct'
import useUser from '@components/hooks/useUser'
import useCart from '@components/hooks/useCart'

const ProductDetails: React.FC = () => {
  const [reviewModal, setReviewModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const queryClient = useQueryClient()

  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query

  const product = useProduct(id)
  const user = useUser()

  const alreadyInFavorites = user?.favorites?.some(
    (favorite: any) => favorite.productId === id
  )

  const alreadyInCart = user?.cartItems?.some(
    (cart: any) => cart.productId === id
  )

  const favoriteMutation = useMutation(
    ({ func, userEmail, productId }: any) =>
      func(userEmail && userEmail, productId && productId),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['users'])
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )

  const cartMutation = useCart(id, quantity)

  if (product.isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={product?.data.image}
          alt={product?.data.name}
          layout="fill"
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className={styles.shipping}>Free Shipping</span>
          {alreadyInFavorites ? (
            <button
              disabled={favoriteMutation.isLoading}
              onClick={() =>
                favoriteMutation.mutate({
                  func: removeFromFavorites,
                  productId: id,
                })
              }
              className={styles.favorites}
            >
              <AiFillHeart />
            </button>
          ) : (
            <button
              disabled={favoriteMutation.isLoading}
              onClick={() =>
                favoriteMutation.mutate({
                  func: addToFavorites,
                  userEmail: session?.user?.email,
                  productId: id,
                })
              }
              className={styles.favorites}
            >
              <AiOutlineHeart />
            </button>
          )}
        </div>
        <h1 className={styles.title}>{product?.data.name}</h1>
        <p className={styles.description}>{product?.data.description}</p>
        <p className={styles.price}>{product?.data.price}</p>
        <p className={styles.rating}>
          <span>{product?.data.rating}</span>
          <AiFillStar />
        </p>
      </div>
      <div className={styles.payment}>
        <p>{product?.data.stock ? 'In stock' : 'Out of stock'}</p>
        <div className={styles.actions}>
          <div className={styles.quantity}>
            <button
              disabled={quantity <= 1}
              onClick={() => setQuantity((prev) => prev - 1)}
              className={styles.minus}
            >
              <AiOutlineMinus />
            </button>
            <span>{quantity}</span>

            <button
              disabled={quantity >= product?.data.stock}
              onClick={() => setQuantity((prev) => prev + 1)}
              className={styles.plus}
            >
              <AiOutlinePlus />
            </button>
          </div>
          {alreadyInCart ? (
            <button className={styles.alreadyInCart}>Already in Cart</button>
          ) : (
            <button
              className={styles.addToCart}
              disabled={
                !product?.data.stock || cartMutation.isLoading || alreadyInCart
              }
              onClick={() =>
                cartMutation.mutate({
                  userEmail: session?.user.email,
                  productId: id,
                  quantity,
                })
              }
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className={styles.reviews}>
        <Ratings reviews={product?.data.reviews} />

        <div className={styles.createReviewButton}>
          <h2>Review this product</h2>
          <p>Share your thoughts with other customers</p>
          <button onClick={() => setReviewModal(true)}>
            Write a customer review
          </button>
        </div>
        {reviewModal && (
          <ReviewForm product={product?.data} setReviewModal={setReviewModal} />
        )}
        <Reviews product={product?.data} />
      </div>
    </div>
  )
}

export default ProductDetails
