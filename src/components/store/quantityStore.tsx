// toggle modal with zustand

import { devtools } from 'zustand/middleware'
import create from 'zustand'

interface IQuantity {
  quantity: number
  incrementQuantity: () => void
  decrementQuantity: () => void
  setQuantity: (quantity: number) => void
}

const useQuantityStore = create<IQuantity>()(
  devtools((set) => ({
    quantity: 1,
    incrementQuantity: () =>
      set((state: any) => ({ quantity: state.quantity + 1 })),
    decrementQuantity: () =>
      set((state: any) => ({ quantity: state.quantity - 1 })),
    setQuantity: (quantity: number) => set({ quantity }),
  }))
)

export default useQuantityStore
