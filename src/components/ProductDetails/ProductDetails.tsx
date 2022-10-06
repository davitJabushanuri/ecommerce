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
import {
  useQuery,
  QueryCache,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'

import { useSession } from 'next-auth/react'

import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import Ratings from './Ratings'
import addToFavorites from '@components/helpers/addToFavorites'
import addToCart from '@components/helpers/addToCart'
import fetchUsers from '@components/helpers/fetchUsers'
import removeFromFavorites from '@components/helpers/removeFromFavorites'

const ProductDetails: React.FC = () => {
  const [reviewModal, setReviewModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const queryClient = useQueryClient()

  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query

  const queryCache = new QueryCache({
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const { data: users } = useQuery(['users'], () => fetchUsers())

  const user = users?.find((user: any) => user.email === session?.user?.email)

  const alreadyInFavorites = user?.favorites?.some(
    (favorite: any) => favorite.productId === id
  )

  const alreadyInCart = user?.cartItems?.some(
    (cart: any) => cart.productId === id
  )

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(['product', id], async () => {
    return axios.get(`/api/products/${id}`).then((response) => {
      return response.data
    })
  })

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

  const cartMutation = useMutation(
    ({ userEmail, productId, quantity }: any) =>
      addToCart(userEmail, productId, quantity),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['product', id])
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={product?.image}
          alt={product?.name}
          layout="fill"
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className={styles.shipping}>Free Shipping</span>
          {alreadyInFavorites ? (
            <button
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
        <h1 className={styles.title}>{product?.name}</h1>
        <p className={styles.description}>{product?.description}</p>
        <p className={styles.price}>{product?.price}</p>
        <p className={styles.rating}>
          <span>{product?.rating}</span>
          <AiFillStar />
        </p>
      </div>
      <div className={styles.payment}>
        <p>{product?.stock ? 'In stock' : 'Out of stock'}</p>
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
              disabled={quantity >= product?.stock}
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
                !product?.stock || cartMutation.isLoading || alreadyInCart
              }
              onClick={() =>
                cartMutation.mutate({
                  func: addToCart,
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
        <Ratings reviews={product.reviews} />

        <div className={styles.createReviewButton}>
          <h2>Review this product</h2>
          <p>Share your thoughts with other customers</p>
          <button onClick={() => setReviewModal(true)}>
            Write a customer review
          </button>
        </div>
        {reviewModal && (
          <ReviewForm product={product} setReviewModal={setReviewModal} />
        )}
        <Reviews product={product} />
      </div>
    </div>
  )
}

export default ProductDetails
