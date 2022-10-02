const incrementHelpful = async (id: string, userEmail: any, helpful: any) => {
  try {
    // check if user has already voted
    if (helpful.filter((user: any) => user.userEmail === userEmail).length > 0)
      return

    const response = await fetch(`/api/products/review/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        reviewId: id,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

export default incrementHelpful
