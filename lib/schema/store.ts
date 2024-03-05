import {
    pgTable,
    text,
    timestamp,
    uuid,
  } from "drizzle-orm/pg-core";

export const store = pgTable("store", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
})

export type NewStore = typeof store.$inferInsert