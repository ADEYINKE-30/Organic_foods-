export type UserRole = 'admin' | 'user';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type CouponType = 'percentage' | 'fixed';

export interface User {
  id: string;             // UUID
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  imageUrl: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;           // DECIMAL stored as string in DB, parsed to number in API
  comparePrice: number | null;
  categoryId: string;
  stockQuantity: number;
  sku: string;
  weight: number | null;
  nutritionalInfo: Record<string, unknown> | null;
  images: string[];        // Cloudinary URLs
  isOrganic: boolean;
  isGlutenFree: boolean;
  isVegan: boolean;
  ratingAvg: number;
  ratingCount: number;
  isDeleted: boolean;      // soft delete
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  addedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  shippingAddressId: string;
  billingAddressId: string | null;
  paymentMethod: 'stripe' | 'paypal';
  paymentStatus: PaymentStatus;
  stripePaymentIntentId: string | null;
  paypalOrderId: string | null;
  trackingNumber: string | null;
  createdAt: Date;
  deliveredAt: Date | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;   // snapshot at time of order
  price: number;         // snapshot at time of order
  quantity: number;
  total: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  images: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount: number | null;
  expiryDate: Date | null;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
}

export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  addedAt: Date;
}
