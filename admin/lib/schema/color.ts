import {
    pgTable,
    text,
    timestamp,
    serial,
    integer,
  } from "drizzle-orm/pg-core";
import { store } from ".";

export const color = pgTable("colors", {
    id: serial("id").primaryKey(),
    storeId: integer("store_id").notNull().references(() => store.id),
    name: text("name").notNull(),
    value: text("value").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export type Color = typeof color.$inferSelect;
export type NewColor = typeof color.$inferInsert;
