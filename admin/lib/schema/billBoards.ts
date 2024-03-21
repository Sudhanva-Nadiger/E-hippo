import {
    pgTable,
    text,
    timestamp,
    serial,
    integer,
  } from "drizzle-orm/pg-core";
import { store } from ".";

export const billBoards = pgTable("billboards", {
    id: serial("id").primaryKey(),
    storeId: integer("store_id").notNull().references(() => store.id),
    label: text("label").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
})

export type BillBoard = typeof billBoards.$inferSelect
export type NewBillBoard = typeof billBoards.$inferInsert