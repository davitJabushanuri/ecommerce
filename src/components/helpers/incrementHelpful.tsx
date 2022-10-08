const incrementHelpful = async (id: string, userId: any, helpful: any) => {
  try {
    console.log(helpful)
    // check if user has already voted
    if (helpful.filter((user: any) => user.userId === userId).length > 0) return

    const response = await fetch(`/api/products/review/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        reviewId: id,
      }),
    })
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

export default incrementHelpful
