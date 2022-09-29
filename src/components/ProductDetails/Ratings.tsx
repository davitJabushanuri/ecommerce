import styles from './Ratings.module.scss'
import StarRating from 'react-svg-star-rating'
import getAverageRating from '@components/helpers/getAverageRating'
import Progress from './Progress'
import getPercentage from '@components/helpers/getPercentage'

const Ratings = ({ reviews }: any) => {
  const averageRating = parseFloat(getAverageRating(reviews)) || 0

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

      <div className={styles.progressBar}>
        <Progress star={5} value={Number(getPercentage(reviews, 5))} />
        <Progress star={4} value={Number(getPercentage(reviews, 4))} />
        <Progress star={3} value={Number(getPercentage(reviews, 3))} />
        <Progress star={2} value={Number(getPercentage(reviews, 2))} />
        <Progress star={1} value={Number(getPercentage(reviews, 1))} />
      </div>
      <p className={styles.question}>How do we calculate ratings?</p>
    </div>
  )
}

export default Ratings
