import { db } from "@/lib/db";
import { store } from "@/lib/schema";
import { SettingsFormData, settingsFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(request: Request,
    { params } : {
        params: {
            storeId: string;
        }
    }
) {
    const { userId } = auth();

    if(!userId) {
        return new NextResponse("Unauthorized", {
            status: 401
        });
    }

    const body = await request.json() as SettingsFormData;
    const { success } = settingsFormSchema.safeParse(body);
    
    if(!success) {
        return new NextResponse("Invalid data", {
            status: 400
        });
    }

    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    const { name } = body;

    try {
        const id = parseInt(params.storeId);
        if(Number.isNaN(id)) {
            return new NextResponse("Invalid store id", {
                status: 400
            });
        }

        const updatedStore = await db.update(store).set({ name, updatedAt: new Date() }).where(and(eq(store.id, id), eq(store.userId, userId))).returning();
        console.log(["store_patch"], updatedStore);
        return NextResponse.json(updatedStore);

    } catch (error) {
        console.log(["store_patch"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function DELETE(_: Request,
    { params } : {
        params: {
            storeId: string;
        }
    }
) {
    const { userId } = auth();

    if(!userId) {
        return new NextResponse("Unauthorized", {
            status: 401
        });
    }

    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    try {
        const id = parseInt(params.storeId);
        if(Number.isNaN(id)) {
            return new NextResponse("Invalid store id", {
                status: 400
            });
        }
        
        const deletedStore = await db.delete(store).where(and(eq(store.id, id), eq(store.userId, userId))).returning();
        console.log(["store_delete"], deletedStore);
        return NextResponse.json(deletedStore);

    } catch (error) {
        console.log(["store_delete"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }  

}
