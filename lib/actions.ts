import { db } from '@/lib/db';
import { store, billBoards, category, size, color, product } from '@/lib/schema';
import { and, desc, eq } from 'drizzle-orm';

const errorResponse = {
    success: false,
} as const;

export async function fetchStore(storeId: string, userId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }
        
        const res = (await db.select().from(store).where(and(eq(store.id, id), eq(store.userId, userId))))[0];
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchStore", error);
        return errorResponse;
    }
}

export async function fetchUserStores(userId: string) {
    try {
        const res = (await db.select().from(store).where(eq(store.userId, userId)))[0];
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("fetch User Stores",error);
        return errorResponse;
    }
}

export async function fetchAllUserStores(userId: string) {
    try {
        const res = (await db.select().from(store).where(eq(store.userId, userId)));
        return {
            success: true as const,
            data: res
        };
    } catch (error) {
        console.log(error);
        return errorResponse;
    }
}

export async function fetchBillBoard(billBoardId: string) {
    try {
        const id = parseInt(billBoardId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = (await db.select().from(billBoards).where(eq(billBoards.id, id)))[0];
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchBillBoards", error);
        return errorResponse;
    }
}

export async function fetchAllBillboards(storeId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = await db.select().from(billBoards).where(eq(billBoards.storeId, id)).orderBy(desc(billBoards.createdAt));
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchAllBillBoards", error);
        return errorResponse;
    }
}

export async function fetchAllCategoriesWithBillBoard(storeId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = await db.query.category.findMany({
            with: {
                billBoards: true
            },
            where: (category, { eq }) => eq(category.storeId, id),
        })

        return {
            success: true,
            data: res
        };
        
    } catch (error) {
        console.log("error_fetchAllBillBoards", error);
        return errorResponse;
    }
}

export async function fetchAllCategories(storeId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = await db.select().from(category).where(eq(category.storeId, id)).orderBy(desc(category.createdAt));
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchAllCategories", error);
        return errorResponse;
    }
}

export async function fetchCategory(categoryId: string) {
    try {
        const id = parseInt(categoryId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = (await db.select().from(category).where(eq(category.id, id)))[0];
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchCategory", error);
        return errorResponse;
    }
}

export async function fetchAllSizes(storeId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = await db.select().from(size).where(eq(size.storeId, id)).orderBy(desc(size.createdAt));
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetch_all_sizes", error);
        return errorResponse;
    }
}

export async function fetchSize(sizeId: string) {
    try {
        const id = parseInt(sizeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = (await db.select().from(size).where(eq(size.id, id)))[0];
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchSize", error);
        return errorResponse;
    }
}

export async function fetchAllColors(storeId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = await db.select().from(color).where(eq(color.storeId, id)).orderBy(desc(color.createdAt));
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetch_all_colors", error);
        return errorResponse;
    }
}

export async function fetchColor(colorId: string) {
    try {
        const id = parseInt(colorId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = (await db.select().from(color).where(eq(color.id, id)))[0];
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetch_color", error);
        return errorResponse;
    }
}

export async function fetchAllProducts(storeId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = await db.query.product.findMany({
            with: {
                size: true,
                category: true,
                color: true
            },
            where: (product, { eq }) => eq(product.storeId, id),
        })
        
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchAllProducts", error);
        return errorResponse;
    }
}

export async function fetchProduct(productId: string) {
    try {
        const id = parseInt(productId);

        if(Number.isNaN(id)) {
            return {
                success: true,
                data: null
            };
        }

        const res = await db.query.product.findFirst({
            where: (product, { eq }) => eq(product.id, id),
            with: {
                images: true,
            }
        });
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log("error_fetchProduct", error);
        return errorResponse;
    }
}