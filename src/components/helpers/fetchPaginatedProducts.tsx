import axios from 'axios'

export default async function fetchProducts(slug: string, page = 0) {
  const response = await axios.get(`/api/products/${slug}?page=${page}`)
  return response.data.products
}
