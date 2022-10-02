const addToFavorites = async (userEmail: any, productId: any) => {
  try {
    const response = await fetch('/api/products/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, productId }),
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export default addToFavorites
