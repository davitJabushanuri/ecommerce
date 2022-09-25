import axios from 'axios'

export default async function fetchProduct(id: string) {
  const response = await axios.get('/api/products/' + id)
  return response.data
}
