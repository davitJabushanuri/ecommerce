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

export interface IPostProduct {
  name: string
  description: string
  category: string
  condition: string
  image: string
  brand: string
  price: string
  stock: string
  shipping: string
}

interface IQuestion {
  message: string
  userName: string
  userId: string
  productId: string
  id?: string
  createdAt?: Date
  updatedAt?: Date
}
