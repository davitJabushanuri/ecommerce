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
import {
  useQuery,
  QueryCache,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { useFormik } from 'formik'
import { reviewValidation } from '@components/Schemas/reviewValidation'

import { useSession } from 'next-auth/react'
import createReview from '@components/helpers/createReview'

const ProductDetails: React.FC = () => {
  const queryClient = useQueryClient()
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

  const formik = useFormik({
    initialValues: {
      rating: '',
      comment: '',
    },
    validationSchema: reviewValidation,
    onSubmit: (values) => {
      if (session)
        mutation.mutate({
          values,
          userEmail: session?.user.email,
          productId: product.id,
        })
    },
  })

  const mutation = useMutation(
    ({ values, userEmail, productId }: any) =>
      createReview(values, userEmail, productId),
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries(['product', id])
        formik.resetForm()
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: (data, error) => {
        console.log('settled')
      },
    }
  )

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
          <button className={styles.favorites}>
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

      <div className={styles.reviewForm}>
        <h2>Leave a review</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="rating">Rating</label>
            <input
              id="rating"
              name="rating"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rating}
            />

            {formik.touched.rating && formik.errors.rating ? (
              <div className={styles.inputError}>{formik.errors.rating}</div>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="comment">Comment</label>
            <input
              id="comment"
              name="comment"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
            />

            {formik.touched.comment && formik.errors.comment ? (
              <div className={styles.inputError}>{formik.errors.comment}</div>
            ) : null}
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading
                ? 'Saving...'
                : mutation.isError
                ? 'Error!'
                : mutation.isSuccess
                ? 'Saved!'
                : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.reviews}>
        <h2>Reviews</h2>
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id}>
                <p>{review.rating}</p>
                <p>{review.comment}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ProductDetails
