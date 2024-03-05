import { db } from '@/lib/db';
import { store } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function fetchStore(storeId: string) {
    try {
        return (await db.select().from(store).where(eq(store.id, storeId)))[0];
    } catch (error) {
        return null;
    }
}

export async function fetchUserStores(userId: string) {
    try {
        return (await db.select().from(store).where(eq(store.userId, userId)))[0];
    } catch (error) {
        return null;
    }
}