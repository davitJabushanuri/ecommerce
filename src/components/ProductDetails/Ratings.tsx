import styles from './Ratings.module.scss'

const Ratings = ({ reviews }: any) => {
  const overallRating =
    reviews.reduce((acc: any, review: any) => {
      return acc + review.rating
    }, 0) / reviews.length
  console.log(overallRating)
  return (
    <div className={styles.container}>
      <h2>Customer reviews</h2>
      <div className={styles.overall}>
        <div className={styles.overallRating}>
          <span>{overallRating} out of 5</span>
          <p>{reviews.length} customer ratings</p>
        </div>
      </div>
    </div>
  )
}

export default Ratings
