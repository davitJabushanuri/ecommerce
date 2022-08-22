import create from 'zustand'
import { IProduct } from 'ts/interfaces/db_interfaces'

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products: IProduct[]) => set({ products: products }),
}))

export default useProductStore
