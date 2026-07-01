import { pgTable, uuid, varchar, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { products } from './products.js';

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  rating: integer('rating').notNull(), // 1 to 5 stars
  comment: varchar('comment', { length: 2000 }).notNull(),
  images: jsonb('images').$type<string[]>().default([]).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
