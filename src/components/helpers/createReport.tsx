const createReport = async (id: string) => {
  try {
    const response = await fetch(`/api/products/review/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewId: id,
        message: 'This review is inappropriate',
        description: 'This review is inappropriate',
      }),
    })
  } catch (error) {
    console.log(error)
  }
}

export default createReport
