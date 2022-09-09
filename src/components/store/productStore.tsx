import create from 'zustand'

const useProductStore = create((set) => ({
  productPath: '',
  setProductPath: (productPath: string) => set({ productPath: productPath }),
}))

export default useProductStore
