import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { products } from './products.js';

export const wishlist = pgTable('wishlist', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  addedAt: timestamp('added_at').defaultNow().notNull(),
});
