import { pgTable, uuid, varchar, decimal, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { categories } from './categories.js';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: varchar('description', { length: 4000 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // DECIMAL for exact monetary values
  comparePrice: decimal('compare_price', { precision: 10, scale: 2 }),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  weight: decimal('weight', { precision: 6, scale: 2 }),
  nutritionalInfo: jsonb('nutritional_info'),
  images: jsonb('images').$type<string[]>().default([]).notNull(),
  isOrganic: boolean('is_organic').default(false).notNull(),
  isGlutenFree: boolean('is_gluten_free').default(false).notNull(),
  isVegan: boolean('is_vegan').default(false).notNull(),
  ratingAvg: decimal('rating_avg', { precision: 3, scale: 2 }).default('0.00').notNull(),
  ratingCount: integer('rating_count').default(0).notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
