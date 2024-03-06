import { db } from '@/lib/db';
import { store } from '@/lib/schema';
import { eq } from 'drizzle-orm';

const errorResponse = {
    success: false,
} as const;

export async function fetchStore(storeId: string) {
    try {
        const res = (await db.select().from(store).where(eq(store.id, storeId)))[0];
        return {
            success: true,
            data: res
        };
    } catch (error) {
        console.log(error);
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
        console.log(error);
        return errorResponse;
    }
}