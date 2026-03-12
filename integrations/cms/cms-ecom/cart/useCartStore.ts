import { create } from 'zustand';

export const useCartStore = create((set) => ({
cart: null,
isOpen: false,
setIsOpen: (open) => set({ isOpen: open }),
addItem: () => Promise.resolve(),
removeItem: () => Promise.resolve(),
updateQuantity: () => Promise.resolve(),
}));

export default useCartStore;
