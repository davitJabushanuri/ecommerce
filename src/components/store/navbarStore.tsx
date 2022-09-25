// toggle modal with zustand

import { devtools, persist } from 'zustand/middleware'
import create from 'zustand'

interface INavbarStore {
  isNavbarOpen: boolean
  toggleNavbar: () => void
  closeNavbar: () => void
}

const useNavbarStore = create<INavbarStore>()(
  devtools((set) => ({
    isNavbarOpen: false,
    toggleNavbar: () =>
      set((state: any) => ({ isNavbarOpen: !state.isNavbarOpen })),
    closeNavbar() {
      set({ isNavbarOpen: false })
    },
  }))
)

export default useNavbarStore
