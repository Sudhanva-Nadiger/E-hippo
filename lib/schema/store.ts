import {
    pgTable,
    text,
    timestamp,
    serial,
  } from "drizzle-orm/pg-core";

export const store = pgTable("store", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
})

export type NewStore = typeof store.$inferInsert
export type Store = typeof store.$inferSelect