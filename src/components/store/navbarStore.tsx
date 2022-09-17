// toggle modal with zustand

import create from 'zustand'

const useNavbarStore = create((set) => ({
  isNavbarOpen: false,
  toggleNavbar: () =>
    set((state: any) => ({ isNavbarOpen: !state.isNavbarOpen })),
  closeNavbar() {
    set({ isNavbarOpen: false })
  },
}))

export default useNavbarStore
