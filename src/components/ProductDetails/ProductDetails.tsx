/* eslint-disable @next/next/no-img-element */
import styles from './ProductDetails.module.scss'
import {
  AiFillHeart,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineHeart,
} from 'react-icons/ai'
import { BiDollar } from 'react-icons/bi'
import { MdDone } from 'react-icons/md'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import Reviews from './Reviews'
import ReviewForm from './ReviewForm'
import Ratings from './Ratings'
import useProduct from '@components/hooks/useProduct'
import useUser from '@components/hooks/useUser'
import useCart from '@components/hooks/useCart'
import useFavorites from '@components/hooks/useFavorites'
import StarRating from 'react-svg-star-rating'
import getAverageRating from '@components/helpers/getAverageRating'
import Questions from './Questions'
import QuestionForm from './QuestionForm'

const ProductDetails: React.FC = () => {
  const [reviewModal, setReviewModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const router = useRouter()
  const { id } = router.query

  const product = useProduct(id)
  const user = useUser()
  console.log(product.data)

  const alreadyInFavorites = useMemo(
    () => user?.favorites?.some((favorite: any) => favorite.productId === id),
    [id, user?.favorites]
  )

  const alreadyInCart = useMemo(
    () => user?.cartItems?.some((cart: any) => cart.productId === id),
    [id, user?.cartItems]
  )

  const totalAmount = product.isSuccess
    ? product.data.price * quantity + product.data.shipping
    : 0

  const averageRating = product.isSuccess
    ? parseFloat(getAverageRating(product?.data.reviews))
    : 0

  const favoriteMutation = useFavorites()

  const cartMutation = useCart('add')

  if (product.isLoading) return <div>Loading...</div>
  if (product.isError) return <div>Error</div>

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
        <h1 className={styles.title}>{product?.data.name}</h1>
        <div className={styles.ratingOverview}>
          <StarRating
            unit="float"
            count={5}
            isReadOnly={true}
            initialRating={averageRating}
            size={16}
            starClassName={styles.star}
            containerClassName={styles.starContainer}
          />{' '}
          <a href="#reviews">
            {product.data.reviews ? product.data.reviews.length : 0} ratings
          </a>
        </div>

        <div className={styles.shippingContainer}>
          <div>
            {product.data.shipping === 0 ? (
              <div className={`${styles.shipping} ${styles.freeShipping}`}>
                <p>Free shipping</p>
              </div>
            ) : (
              <div>
                <p>Shipping: ${product.data.shipping}</p>
              </div>
            )}
          </div>
        </div>

        <p className={styles.price}>
          <span>
            <BiDollar />
          </span>
          <p>{product?.data.price}</p>
        </p>

        <div className={styles.stockContainer}>
          {product?.data.stock ? (
            <div className={styles.stock}>
              <p>In stock.</p>
              <span>
                {product.data.stock > 100
                  ? 'More than 100 available'
                  : product.data.stock > 10
                  ? 'more than 10 available'
                  : product.data.stock <= 10
                  ? `${product.data.stock`available`}`
                  : ''}
              </span>
            </div>
          ) : (
            <div className={styles.stock}>
              <p>Out of stock.</p>
            </div>
          )}
        </div>

        <p className={styles.description}>{product?.data.description}</p>
      </div>

      {/* PAYMENT */}
      <div className={styles.payment}>
        <p className={styles.totalAmount}>{totalAmount}</p>
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
            <button className={styles.alreadyInCart}>
              <MdDone />
              <span>Already in Your Cart</span>
            </button>
          ) : (
            <button
              className={styles.addToCart}
              disabled={
                !product?.data.stock || cartMutation.isLoading || alreadyInCart
              }
              onClick={() =>
                cartMutation.mutate({
                  userId: user?.id,
                  productId: id,
                  quantity,
                })
              }
            >
              Add to Cart
            </button>
          )}
        </div>

        <div className={styles.favoritesContainer}>
          {alreadyInFavorites ? (
            <button
              disabled={favoriteMutation.isLoading}
              onClick={() =>
                favoriteMutation.mutate({
                  userId: user?.id,
                  productId: id,
                  action: 'remove',
                })
              }
              className={styles.favorites}
            >
              <AiFillHeart /> <span>REMOVE FROM FAVORITES</span>
            </button>
          ) : (
            <button
              disabled={favoriteMutation.isLoading}
              onClick={() =>
                favoriteMutation.mutate({
                  userId: user?.id,
                  productId: id,
                  action: 'add',
                })
              }
              className={styles.favorites}
            >
              <AiOutlineHeart /> <span>ADD TO FAVORITES</span>
            </button>
          )}
        </div>
      </div>

      {/* QUESTIONS */}
      <div className={styles.questions}>
        <Questions
          questions={product.data.questions}
          productId={product.data.id}
          userId={user.id}
          userName={user.name}
        />
        <QuestionForm
          productId={product.data.id}
          userId={user.id}
          userName={user.name}
        />
      </div>

      {/* REVIEWS */}
      <div id="reviews" className={styles.reviews}>
        <Ratings reviews={product?.data.reviews} />

        <div className={styles.createReviewButton}>
          <h2>Review this product</h2>
          <p>Share your thoughts with other customers</p>
          <button onClick={() => setReviewModal(true)}>
            Write a customer review
          </button>
        </div>
        <Reviews product={product?.data} />
        {reviewModal && (
          <ReviewForm
            userId={user.id}
            product={product?.data}
            setReviewModal={setReviewModal}
          />
        )}
      </div>
    </div>
  )
}

export default ProductDetails
