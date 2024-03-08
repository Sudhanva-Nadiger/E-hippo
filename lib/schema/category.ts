import {
    pgTable,
    text,
    timestamp,
    serial,
    integer,
  } from "drizzle-orm/pg-core";
import { store, billBoards } from ".";

export const category = pgTable("categories", {
    id: serial("id").primaryKey(),
    storeId: integer("store_id").notNull().references(() => store.id),
    billBoardId: integer("billboard_id").notNull().references(() => billBoards.id),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export type Category = typeof category.$inferSelect
export type NewCategory = typeof category.$inferInsert