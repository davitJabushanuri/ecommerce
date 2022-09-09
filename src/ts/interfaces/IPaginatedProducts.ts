import { IProduct } from './IProduct'

export interface IPaginatedProducts {
  products: IProduct[]
  hasMore: boolean
}
