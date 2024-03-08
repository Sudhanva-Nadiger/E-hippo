import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { billBoards, store } from "@/lib/schema";
import { BillBoardFormData, billBoardFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params } : {
        params: {
            storeId: string;
            billboardId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.billboardId) {
        return new NextResponse("Billboard id is required", {
            status: 400
        });
    }

    const { userId } = auth();

    if(!userId) {
        return new NextResponse("Unauthorized", {
            status: 401
        });
    }

    try {
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

        const numBullBoardId = parseInt(params.billboardId);
        if(Number.isNaN(numBullBoardId)) {
            return new NextResponse("Invalid billboard id", {
                status: 400
            });
        }

        const [billBoard] = await db.select()
                                  .from(billBoards)
                                  .where(and(
                                        eq(billBoards.id, numBullBoardId), 
                                        eq(billBoards.storeId, id)
                                    ));
        return NextResponse.json(billBoard);

    } catch (error) {
        console.log(["billboards_patch"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function PATCH(request: Request,
    { params } : {
        params: {
            storeId: string;
            billboardId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.billboardId) {
        return new NextResponse("Billboard id is required", {
            status: 400
        });
    }

    const { userId } = auth();

    if(!userId) {
        return new NextResponse("Unauthorized", {
            status: 401
        });
    }

    const body = await request.json() as BillBoardFormData;
    const { success } = billBoardFormSchema.safeParse(body);
    
    if(!success) {
        return new NextResponse("Invalid data", {
            status: 400
        });
    }

    const { label, imageUrl } = body;

    try {
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

        const numBullBoardId = parseInt(params.billboardId);
        if(Number.isNaN(numBullBoardId)) {
            return new NextResponse("Invalid billboard id", {
                status: 400
            });
        }

        await db.update(billBoards).set({
            label,
            imageUrl,
            updatedAt: new Date()
        }).where(and(eq(billBoards.id, numBullBoardId), eq(billBoards.storeId, id))).returning()

        return new NextResponse("Billboard updated");

    } catch (error) {
        console.log(["billboards_get"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function DELETE(_: Request,
    { params } : {
        params: {
            storeId: string;
            billboardId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.billboardId) {
        return new NextResponse("Billboard id is required", {
            status: 400
        });
    }

    const { userId } = auth();

    if(!userId) {
        return new NextResponse("Unauthorized", {
            status: 401
        });
    }

    try {
        const storeId = params.storeId;
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return new NextResponse("Invalid storeId", {
                status: 400
            });
        }

        const response = await fetchStore(storeId, userId);

        if(!response.success) {
            return new NextResponse("Store not found", {
                status: 404
            });
        }

        const numBillBoardId = parseInt(params.billboardId);
        if(Number.isNaN(numBillBoardId)) {
            return new NextResponse("Invalid billboard id", {
                status: 400
            });
        }
        
        await db.delete(billBoards)
                .where(and(
                    eq(billBoards.storeId, id), 
                    eq(billBoards.id, numBillBoardId)
                ));
        return NextResponse.json(numBillBoardId);

    } catch (error) {
        console.log(["billboards_delete"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }  

}
