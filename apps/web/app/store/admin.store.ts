import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getAdminProducts,
  mockCoupons,
  type AdminProduct,
  type Coupon,
} from '~/lib/admin-data';
import type { OrderSummary } from '~/lib/mock-data';
import { mockOrders } from '~/lib/mock-data';

type OrderStatus = OrderSummary['status'] | 'cancelled';

export interface AdminOrder extends OrderSummary {
  status: OrderStatus;
  customer: string;
  email: string;
}

interface AdminState {
  products: AdminProduct[];
  orders: AdminOrder[];
  coupons: Coupon[];
  updateProduct: (id: string, patch: Partial<AdminProduct>) => void;
  deleteProducts: (ids: string[]) => void;
  addProduct: (product: AdminProduct) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;
}

function seedOrders(): AdminOrder[] {
  const names = ['Jane Doe', 'John Smith', 'Aisha Khan'];
  const emails = ['jane@example.com', 'john@example.com', 'aisha@example.com'];
  return mockOrders.map((order, i) => ({
    ...order,
    customer: names[i % names.length]!,
    email: emails[i % emails.length]!,
  }));
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      products: getAdminProducts(),
      orders: seedOrders(),
      coupons: mockCoupons,
      updateProduct: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deleteProducts: (ids) =>
        set((state) => ({
          products: state.products.filter((p) => !ids.includes(p.id)),
        })),
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      addCoupon: (coupon) => set((state) => ({ coupons: [coupon, ...state.coupons] })),
      toggleCoupon: (id) =>
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c,
          ),
        })),
      deleteCoupon: (id) =>
        set((state) => ({ coupons: state.coupons.filter((c) => c.id !== id) })),
    }),
    { name: 'freshmart-admin' },
  ),
);
