import { pgTable, uuid, varchar, decimal, integer, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const couponTypeEnum = pgEnum('coupon_type', ['percentage', 'fixed']);

export const coupons = pgTable('coupons', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  type: couponTypeEnum('type').notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  minOrderAmount: decimal('min_order_amount', { precision: 10, scale: 2 }),
  expiryDate: timestamp('expiry_date'),
  usageLimit: integer('usage_limit'),
  usedCount: integer('used_count').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});
