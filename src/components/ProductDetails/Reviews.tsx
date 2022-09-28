/* eslint-disable @next/next/no-img-element */
const Reviews = ({ product }: any) => {
  return (
    <div>
      <h2>Reviews</h2>
      {product.reviews &&
        product.reviews.map((review: any) => {
          return (
            <div key={review.id}>
              <p>{review.rating}</p>
              <p>{review.title}</p>
              <p>{review.description}</p>
              {review.image && <img src={review.image} alt="" />}
            </div>
          )
        })}
    </div>
  )
}

export default Reviews
