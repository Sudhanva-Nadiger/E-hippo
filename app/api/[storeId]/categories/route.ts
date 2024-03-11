import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { category } from "@/lib/schema";
import { CategoryFormData, categoryFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request,
     { params } : { params: { storeId: string } }
) {
    try {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {
                status: 401
            });
        }

        const body = await request.json() as CategoryFormData;
        const { success } = categoryFormSchema.safeParse(body);
        if(!success) {
            return new NextResponse("Invalid input", {
                status: 400
            });
        }

        const storeId = params.storeId;
        const numStoreId = parseInt(storeId);

        if(Number.isNaN(numStoreId)) {
            return new NextResponse("Invalid storeId", {
                status: 400
            });
        }

        const response = await fetchStore(storeId, userId);

        if(!response.success || !response.data) {
            return new NextResponse("Store not found", {
                status: 404
            });
        }

        const numBillBoardId = parseInt(body.billboardId);

        if(Number.isNaN(numBillBoardId)) {
            return new NextResponse("Invalid billboardId", {
                status: 400
            });
        }

        const newCategory = await db.insert(category).values({
            name: body.name,
            billBoardId: numBillBoardId,
            updatedAt: new Date(),
            storeId: numStoreId
        }).returning();

        console.log("new billboard insert api route", newCategory);
        
        return NextResponse.json(newCategory[0]);

    } catch (error) {
        console.log("categories_POST", error);
        return new NextResponse("Internal error", {
            status: 500
        })
    }
}


export async function GET(request: Request,
     { params } : { params: { storeId: string } }
) {
    try {
        const storeId = params.storeId;
        const numStoreId = parseInt(storeId);

        if(Number.isNaN(numStoreId)) {
            return new NextResponse("Invalid storeId", {
                status: 400
            });
        }

        const allCategories = await db.select().from(category).where(eq(category.storeId, numStoreId));

        console.log("new cat get api route");

        console.log(allCategories);
        
        
        return NextResponse.json(allCategories);

    } catch (error) {
        console.log("Categories_GET", error);
        return new NextResponse("Internal error", {
            status: 500
        })
    }
}