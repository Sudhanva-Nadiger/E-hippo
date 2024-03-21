import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { billBoards, store } from "@/lib/schema";
import { BillBoardFormData, billBoardFormSchema } from "@/lib/zodSchemas";
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

        const body = await request.json() as BillBoardFormData;
        const { success } = billBoardFormSchema.safeParse(body);
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

        const newBillBoard = await db.insert(billBoards).values({
            label: body.label,
            imageUrl: body.imageUrl,
            storeId: id,
            updatedAt: new Date(),
        }).returning();

        console.log("new billboard insert api route", newBillBoard);
        
        return NextResponse.json(newBillBoard[0]);

    } catch (error) {
        console.log("BILLBOARDS_POST", error);
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

        const allBillBoards = await db.select().from(billBoards).where(eq(billBoards.storeId, id));

        console.log("new billboard get api route");
        
        return NextResponse.json(allBillBoards);

    } catch (error) {
        console.log("BILLBOARDS_GET", error);
        return new NextResponse("Internal error", {
            status: 500
        })
    }
}