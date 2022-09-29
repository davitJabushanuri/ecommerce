import styles from './Ratings.module.scss'
import StarRating from 'react-svg-star-rating'
import { useState } from 'react'
import getAverageRating from '@components/helpers/getAverageRating'

const Ratings = ({ reviews }: any) => {
  const [averageRating, setAverageRating] = useState(
    () => parseFloat(getAverageRating(reviews)) || 0
  )

  return (
    <div className={styles.container}>
      <h2>Customer reviews</h2>
      <div className={styles.average}>
        <div className={styles.averageRating}>
          <div className={styles.rating}>
            <StarRating
              unit="float"
              count={5}
              isReadOnly={true}
              initialRating={averageRating}
              size={24}
              containerClassName={styles.starRating}
              starClassName={styles.star}
            />
            <p>{averageRating} out of 5</p>
          </div>
          <p className={styles.customerCount}>
            {reviews.length} customer ratings
          </p>
        </div>
      </div>
    </div>
  )
}

export default Ratings
