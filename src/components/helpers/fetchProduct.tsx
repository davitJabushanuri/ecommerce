import axios from 'axios'

export default async function fetchProducts(
  path = 'recently-viewed',
  id: string
) {
  const response = await axios.get('/api/products/' + path)
  return response.data.products
}
