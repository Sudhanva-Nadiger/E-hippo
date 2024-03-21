import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
    serial,
  } from "drizzle-orm/pg-core";
import { order } from "./order";

export const store = pgTable("store", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
})

export const storeRelations = relations(store, ({ many }) => ({
  orders: many(order)
}))

export type NewStore = typeof store.$inferInsert
export type Store = typeof store.$inferSelect