// toggle modal with zustand

import create from 'zustand'

const useNavbarStore = create((set) => ({
  isNavbarOpen: false,
  toggleNavbar: () =>
    set((state: any) => ({ isNavbarOpen: !state.isNavbarOpen })),
}))

export default useNavbarStore
