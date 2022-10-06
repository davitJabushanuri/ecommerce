const removeFromCart = async (id: any) => {
  try {
    const response = await fetch('api/products/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export default removeFromCart
