/* eslint-disable @next/next/no-img-element */
import styles from './Reviews.module.scss'
import StarRating from 'react-svg-star-rating'
import Moment from 'react-moment'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import incrementHelpful from '@components/helpers/incrementHelpful'
import createReport from '@components/helpers/createReport'

const Reviews = ({ product }: any) => {
  const queryCache = useQueryClient()
  const { data: session } = useSession()

  const mutation = useMutation(
    ({ id, userEmail, helpful, func }: any) =>
      func(id, userEmail && userEmail, helpful && helpful),
    {
      onSuccess: () => {
        console.log('success')
        queryCache.invalidateQueries(['product', product.id])
      },
      onError: () => {
        console.log('error')
      },
      onSettled: () => {
        console.log('settled')
      },
    }
  )

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
                    onClick={() =>
                      mutation.mutate({
                        id: review.id,
                        userEmail: session?.user.email,
                        helpful: review.helpful,
                        func: incrementHelpful,
                      })
                    }
                  >
                    Helpful
                  </button>
                  <button
                    className={styles.report}
                    onClick={() =>
                      mutation.mutate({
                        id: review.id,
                        func: createReport,
                      })
                    }
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Reviews
