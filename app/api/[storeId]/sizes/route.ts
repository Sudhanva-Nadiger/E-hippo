import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { size } from "@/lib/schema";
import { SizeFormData, sizeFormSchema } from "@/lib/zodSchemas";
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

        const body = await request.json() as SizeFormData;
        const { success } = sizeFormSchema.safeParse(body);
        if(!success) {
            return new NextResponse("Invalid input", {
                status: 400
            });
        }

        const storeId = params.storeId;
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
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

        const newSize = await db.insert(size).values({
            name: body.name,
            value: body.value,
            storeId: id,
            updatedAt: new Date(),
        }).returning();

        console.log("new size insert api route", newSize);
        
        return NextResponse.json(newSize[0]);

    } catch (error) {
        console.log("Size-Post", error);
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
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return new NextResponse("Invalid storeId", {
                status: 400
            });
        }

        const sizes = await db.select().from(size).where(eq(size.storeId, id));

        console.log("new size get api route");
        
        return NextResponse.json(sizes);

    } catch (error) {
        console.log("SIZE_GET", error);
        return new NextResponse("Internal error", {
            status: 500
        })
    }
}