const addToCart = async (userEmail: any, productId: any, quantity: number) => {
  try {
    const response = await fetch('/api/products/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
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
