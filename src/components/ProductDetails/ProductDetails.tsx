/* eslint-disable @next/next/no-img-element */
import styles from './ProductDetails.module.scss'
import {
  AiFillStar,
  AiFillHeart,
  AiOutlinePlus,
  AiOutlineMinus,
} from 'react-icons/ai'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery, QueryCache } from '@tanstack/react-query'
import axios from 'axios'

import { useSession } from 'next-auth/react'

import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import Ratings from './Ratings'
import addToFavorites from '@components/helpers/addToFavorites'

const ProductDetails: React.FC = () => {
  const { data: session } = useSession()
  const [quantity, setQuantity] = useState(1)
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

  const { data: product } = useQuery(
    ['product', id],
    async () => {
      return axios.get(`/api/products/${id}`).then((response) => {
        return response.data
      })
    },
    {
      initialData: () => console.log(queryCache.findAll(['products'])),
    }
  )
  if (!product) return null

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
          <button
            onClick={() => addToFavorites(session?.user.email, id)}
            className={styles.favorites}
          >
            <AiFillHeart />
          </button>
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
          <button className={styles.addToCart}>Add to Cart</button>
        </div>
      </div>

      <div className={styles.reviews}>
        <Ratings reviews={product.reviews} />

        <div className={styles.createReviewButton}>
          <h2>Review this product</h2>
          <p>Share your thoughts with other customers</p>
          <button>Write a customer review</button>
        </div>
        <ReviewForm product={product} />
        <Reviews product={product} />
      </div>
    </div>
  )
}

export default ProductDetails
