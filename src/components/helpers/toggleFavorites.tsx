const toggleFavorites = async (userId: any, productId: any, action: string) => {
  if (action === 'add') {
    try {
      const response = await fetch('/api/products/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  if (action === 'remove') {
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
}

export default toggleFavorites
