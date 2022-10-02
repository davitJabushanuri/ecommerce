const createReport = async (id: string, values: any) => {
  try {
    const response = await fetch(`/api/products/review/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewId: id,
        message: values.message,
        description: values.description,
      }),
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export default createReport
