function getPercentage(reviews: any, value: number) {
  const ratings = reviews.map((review: any) => review.rating)
  let count = 0
  ratings.forEach((v: any) => v === value && count++)
  const percentage = (count / ratings.length) * 100
  return percentage.toFixed(0)
}

export default getPercentage
