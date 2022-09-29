const getAverageRating = (reviews: any) => {
  const avg =
    reviews.reduce((acc: any, review: any) => {
      return acc + review.rating
    }, 0) / reviews.length

  return avg.toFixed(1)
}

export default getAverageRating
