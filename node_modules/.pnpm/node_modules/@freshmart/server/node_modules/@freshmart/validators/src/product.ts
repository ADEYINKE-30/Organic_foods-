import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity cannot exceed 99'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity cannot exceed 99'),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  comparePrice: z.number().positive().nullable().optional(),
  categoryId: z.string().uuid('Invalid category ID'),
  stockQuantity: z.number().int().nonnegative('Stock quantity must be non-negative'),
  sku: z.string().min(1, 'SKU is required'),
  weight: z.number().positive().nullable().optional(),
  nutritionalInfo: z.record(z.unknown()).nullable().optional(),
  isOrganic: z.boolean().default(false),
  isGlutenFree: z.boolean().default(false),
  isVegan: z.boolean().default(false),
});

export const submitReviewSchema = z.object({
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  comment: z.string().min(3, 'Comment must be at least 3 characters'),
  images: z.array(z.string().url()).optional(),
});
