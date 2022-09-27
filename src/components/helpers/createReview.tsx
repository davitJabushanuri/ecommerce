const createReview = async (
  values: any,
  userEmail: string,
  productId: string
) => {
  // find user in db
  const data = await fetch('http://localhost:3000/api/users', {
    method: 'GET',
  })
  const users = await data.json()
  const user = users.find((user: any) => user.email === userEmail)

  // create review
  try {
    const review = await fetch('http://localhost:3000/api/products/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        productId: productId,
        rating: values.rating,
        comment: values.comment,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

export default createReview
