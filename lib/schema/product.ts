import {
    boolean,
    decimal,
    integer,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";
import { category, color, size, store, image } from ".";
import { relations } from "drizzle-orm";

export const product = pgTable("products", {
    id: serial("id").primaryKey(),

    name: text("name").notNull(),
    description: text("description"),
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

export const productRelations = relations(product, ({ one, many }) => ({
    category: one(category, {
        fields: [product.categoryId],
        references: [category.id],
        relationName: "category"
    }),
    size: one(size, {
        fields: [product.sizeId],
        references: [size.id],
        relationName: "size"
    }),
    color: one(color, {
        fields: [product.colorId],
        references: [color.id],
        relationName: "color"
    }),
    images: many(image, {
        relationName: "images"
    }),
}))

export type Product = typeof product.$inferSelect;
export type NewProduct = typeof product.$inferInsert;