import type { Product } from './mock-data';
import { getAllProducts, mockOrders, type OrderSummary } from './mock-data';

export interface AdminProduct extends Product {
  sku: string;
  stock: number;
  status: 'active' | 'inactive';
  isOrganic: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  brand: string;
  weight: string;
  saleEndsAt?: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  joined: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  expiresAt: string;
  usedCount: number;
  usageLimit: number;
  isActive: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface SalesPoint {
  date: string;
  revenue: number;
  orders: number;
}

function padSku(id: string) {
  return `FM-${id.padStart(4, '0')}`;
}

export function getAdminProducts(): AdminProduct[] {
  return getAllProducts().map((product, index) => ({
    ...product,
    sku: padSku(product.id),
    stock: [3, 12, 45, 8, 0, 28, 15, 6][index % 8] ?? 10,
    status: index % 7 === 0 ? 'inactive' : 'active',
    isOrganic: index % 2 === 0,
    isVegan: index % 3 === 0,
    isGlutenFree: index % 4 === 0,
    brand: ['FreshMart', 'Green Valley', 'Farm House', 'Nature\'s Best'][index % 4] ?? 'FreshMart',
    weight: ['500g', '1kg', '250g', '2kg'][index % 4] ?? '1kg',
    saleEndsAt: index < 6 ? new Date(Date.now() + (index + 2) * 3600_000).toISOString() : undefined,
  }));
}

export const mockCustomers: AdminCustomer[] = [
  { id: 'c1', name: 'Jane Doe', email: 'jane@example.com', orders: 12, totalSpent: 486.2, lastOrder: 'Jul 7, 2026', joined: 'Jan 12, 2025' },
  { id: 'c2', name: 'John Smith', email: 'john@example.com', orders: 8, totalSpent: 312.5, lastOrder: 'Jul 4, 2026', joined: 'Mar 3, 2025' },
  { id: 'c3', name: 'Aisha Khan', email: 'aisha@example.com', orders: 21, totalSpent: 920.0, lastOrder: 'Jul 6, 2026', joined: 'Nov 18, 2024' },
  { id: 'c4', name: 'Carlos Ruiz', email: 'carlos@example.com', orders: 3, totalSpent: 64.75, lastOrder: 'Jun 28, 2026', joined: 'May 1, 2026' },
  { id: 'c5', name: 'Emma Wilson', email: 'emma@example.com', orders: 15, totalSpent: 540.1, lastOrder: 'Jul 5, 2026', joined: 'Feb 9, 2025' },
];

export const mockCoupons: Coupon[] = [
  { id: 'cp1', code: 'FRESH20', type: 'percentage', value: 20, minOrder: 50, expiresAt: '2026-12-31', usedCount: 142, usageLimit: 500, isActive: true },
  { id: 'cp2', code: 'ORG10', type: 'fixed', value: 10, minOrder: 30, expiresAt: '2026-09-30', usedCount: 89, usageLimit: 200, isActive: true },
  { id: 'cp3', code: 'SUMMER15', type: 'percentage', value: 15, minOrder: 40, expiresAt: '2026-08-15', usedCount: 210, usageLimit: 210, isActive: false },
];

export const mockSubscribers: NewsletterSubscriber[] = [
  { id: 's1', email: 'jane@example.com', subscribedAt: '2026-01-15' },
  { id: 's2', email: 'john@example.com', subscribedAt: '2026-02-02' },
  { id: 's3', email: 'aisha@example.com', subscribedAt: '2026-03-20' },
  { id: 's4', email: 'hello@freshfan.com', subscribedAt: '2026-06-11' },
];

export function getSalesSeries(): SalesPoint[] {
  const points: SalesPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    points.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.round(80 + Math.sin(i / 3) * 40 + (i % 5) * 18),
      orders: 3 + (i % 7),
    });
  }
  return points;
}

export function getDashboardStats() {
  const products = getAdminProducts();
  const orders = mockOrders;
  const customers = mockCustomers;
  return {
    totalSales: orders.reduce((s, o) => s + o.total, 0) + 4280,
    totalOrders: orders.length + 184,
    totalCustomers: customers.length + 92,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 8).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    recentOrders: orders,
    topProducts: products.slice(0, 5),
    salesSeries: getSalesSeries(),
  };
}

export function enrichOrders(orders: OrderSummary[] = mockOrders) {
  return orders.map((order, i) => ({
    ...order,
    customer: mockCustomers[i % mockCustomers.length]?.name ?? 'Guest',
    email: mockCustomers[i % mockCustomers.length]?.email ?? 'guest@freshmart.com',
    payment: i % 2 === 0 ? 'stripe' : 'paypal',
    paymentStatus: order.status === 'cancelled' ? 'failed' : 'paid',
  }));
}
