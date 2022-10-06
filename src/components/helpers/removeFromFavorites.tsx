const removeFromFavorites = async (productId: any) => {
  try {
    const response = await fetch('/api/products/favorites', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export default removeFromFavorites
