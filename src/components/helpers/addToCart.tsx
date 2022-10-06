const addToCart = async (userId: any, productId: any, quantity: number) => {
  // if (!userId) {
  //   throw new Error('User not logged in')
  // }

  try {
    const response = await fetch('/api/products/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    })

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export default addToCart
