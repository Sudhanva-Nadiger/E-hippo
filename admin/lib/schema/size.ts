import {
    pgTable,
    text,
    timestamp,
    serial,
    integer,
  } from "drizzle-orm/pg-core";
import { store } from ".";

export const size = pgTable("sizes", {
    id: serial("id").primaryKey(),
    storeId: integer("store_id").notNull().references(() => store.id),
    name: text("name").notNull(),
    value: text("value").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export type Size = typeof size.$inferSelect;
export type NewSize = typeof size.$inferInsert;
