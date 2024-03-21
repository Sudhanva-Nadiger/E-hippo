import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";
import { product, store } from ".";

export const order = pgTable("orders", {
    id: serial("id").primaryKey(),
    storeId: integer("store_id").notNull().references(() => store.id),
    isPaid: boolean("is_paid").default(false),
    phone: text("phone"),
    address: text("address"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

export const orderItem = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull().references(() => order.id),
    productId: integer("product_id").notNull().references(() => product.id)
})

export const orderRelations = relations(order, ({ one, many }) => ({
    store: one(store, {
        fields: [order.storeId],
        references: [store.id]
    }),
    orderItems: many(orderItem)
}))

export const orderItemRelations = relations(orderItem, ({ one }) => ({
    order: one(order, {
        fields: [orderItem.orderId],
        references: [order.id]
    }),
    product: one(product, {
        fields: [orderItem.productId],
        references: [product.id],
    })
}))

export type Order = typeof order.$inferSelect
export type NewOrder = typeof order.$inferSelect

export type OrderItem = typeof orderItem.$inferSelect
export type NewOrderItem = typeof orderItem.$inferInsert