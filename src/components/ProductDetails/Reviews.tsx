/* eslint-disable @next/next/no-img-element */
import styles from './Reviews.module.scss'

const Reviews = ({ product }: any) => {
  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      {product.reviews &&
        product.reviews.map((review: any) => {
          return (
            <div key={review.id}>
              <p>{review.rating}</p>
              <p>{review.title}</p>
              <p>{review.description}</p>
              <p>{review.userName}</p>
              <img src={review.userImage} alt="" />
              {review.image && <img src={review.image} alt="" />}
            </div>
          )
        })}
    </div>
  )
}

export default Reviews
