export interface IProduct {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  brand: string | null
  category: string | null
  rating: number
  numReviews: number
  isBestSeller: boolean
  isNew: boolean
  isOnSale: boolean
  isTrending: boolean
  shipping: number
  stock: number
  createdAt: Date
  updatedAt: Date
}
