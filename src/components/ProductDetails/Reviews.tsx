/* eslint-disable @next/next/no-img-element */
import styles from './Reviews.module.scss'
import StarRating from 'react-svg-star-rating'
import Moment from 'react-moment'

const Reviews = ({ product }: any) => {
  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      {product.reviews &&
        product.reviews.map((review: any) => {
          return (
            <div className={styles.review} key={review.id}>
              <div className={styles.user}>
                <img src={review.userImage} alt="" />
                <p>{review.userName}</p>
              </div>
              <div className={styles.overview}>
                <StarRating
                  initialRating={review.rating}
                  isReadOnly={true}
                  containerClassName={styles.starsContainer}
                  starClassName={styles.star}
                />

                <p>{review.title}</p>
              </div>
              <div className={styles.reviewDate}>
                <p>Reviewed on</p>
                <Moment format="MMM D, YYYY">{review.createdAt}</Moment>
              </div>

              <div className={styles.description}>
                <p>{review.description}</p>
              </div>

              {review.image && (
                <div className={styles.imageContainer}>
                  <img src={review.image} alt="" />
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default Reviews
