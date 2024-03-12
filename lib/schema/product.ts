import {
    boolean,
    decimal,
    integer,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";
import { category, color, size, store } from ".";

export const product = pgTable("products", {
    id: serial("id").primaryKey(),

    name: text("name").notNull(),
    price: decimal("price").notNull(),
    isFeatured: boolean("is_featured").notNull().default(false),
    isArchived: boolean("is_archived").notNull().default(false),

    storeId: integer("store_id").notNull().references(() => store.id),
    categoryId: integer("category_id").notNull().references(() => category.id),
    sizeId: integer("size_id").notNull().references(() => size.id),
    colorId: integer("color_id").notNull().references(() => color.id),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export type Product = typeof product.$inferSelect;
export type NewProduct = typeof product.$inferInsert;