import { create } from 'zustand';

export interface CartLineItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartLineItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartLineItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

function recalculate(items: CartLineItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: (item, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((line) => line.productId === item.productId);
      const items = existing
        ? state.items.map((line) =>
            line.productId === item.productId
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          )
        : [...state.items, { ...item, quantity }];
      return { items, ...recalculate(items) };
    }),
  removeItem: (productId) =>
    set((state) => {
      const items = state.items.filter((line) => line.productId !== productId);
      return { items, ...recalculate(items) };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const items =
        quantity <= 0
          ? state.items.filter((line) => line.productId !== productId)
          : state.items.map((line) =>
              line.productId === productId ? { ...line, quantity } : line,
            );
      return { items, ...recalculate(items) };
    }),
  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
