/* eslint-disable @next/next/no-img-element */
import styles from './Reviews.module.scss'
import StarRating from 'react-svg-star-rating'
import Moment from 'react-moment'
import Report from '@components/Report/Report'
import { useState } from 'react'
import useUser from '@components/hooks/useUser'
import useHelpful from '@components/hooks/useHelpful'
import useAuth from '@components/hooks/useAuth'

const Reviews = ({ product }: any) => {
  const [modal, toggleModal] = useState(false)
  const session = useAuth()
  const user = useUser()

  const helpfulMutation = useHelpful()

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
                <p>
                  Reviewed on{' '}
                  <Moment format="MMM D, YYYY">{review.createdAt}</Moment>
                </p>
              </div>

              <div className={styles.description}>
                <p>{review.description}</p>
              </div>

              {review.image && (
                <div className={styles.imageContainer}>
                  <img src={review.image} alt="" />
                </div>
              )}

              <div className={styles.feedback}>
                <p>
                  {review.helpful.length > 0 &&
                    `${review.helpful.length} ${
                      review.helpful.length === 1 ? `person` : `people`
                    } found this helpful`}
                </p>

                <div className={styles.buttons}>
                  <button
                    className={styles.helpful}
                    onClick={() => {
                      if (session)
                        helpfulMutation.mutate({
                          id: review.id,
                          userId: user.id,
                          helpful: review.helpful,
                        })
                    }}
                  >
                    Helpful
                  </button>
                  <button
                    className={styles.report}
                    onClick={() => toggleModal(true)}
                  >
                    Report
                  </button>
                </div>
              </div>

              {modal && <Report toggleModal={toggleModal} review={review} />}
            </div>
          )
        })}
    </div>
  )
}

export default Reviews
