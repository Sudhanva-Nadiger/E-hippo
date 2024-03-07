import { db } from '@/lib/db';
import { store, billBoards } from '@/lib/schema';
import { and, eq } from 'drizzle-orm';

const errorResponse = {
    success: false,
} as const;

export async function fetchStore(storeId: string, userId: string) {
    try {
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return errorResponse
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
            return errorResponse;
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