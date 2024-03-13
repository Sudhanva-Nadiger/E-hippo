import {
    pgTable,
    text,
    timestamp,
    serial,
    integer,
  } from "drizzle-orm/pg-core";
import { product } from ".";
import { relations } from "drizzle-orm";

export const image = pgTable("images", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull().references(() => product.id, {
        onDelete: "cascade",
    }),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const imageRelations = relations(image, ({ one }) => ({
    product: one(product, {
        fields: [image.productId],
        references: [product.id],
    }),
}))

export type Image = typeof image.$inferSelect;
export type NewImage = typeof image.$inferInsert;