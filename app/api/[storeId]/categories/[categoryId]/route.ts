import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { category } from "@/lib/schema";
import { CategoryFormData, categoryFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params } : {
        params: {
            storeId: string;
            categoryId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.categoryId) {
        return new NextResponse("Billboard id is required", {
            status: 400
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

        const numCategoryId = parseInt(params.categoryId);
        if(Number.isNaN(numCategoryId)) {
            return new NextResponse("Invalid billboard id", {
                status: 400
            });
        }

        const result = await db.select()
                                  .from(category)
                                  .where(and(
                                        eq(category.id, numCategoryId), 
                                        eq(category.storeId, id)
                                    ));
        return NextResponse.json(result[0]);

    } catch (error) {
        console.log(["billboards_patch"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function PATCH(request: Request,
    { params } : {
        params: {
            storeId: string;
            categoryId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.categoryId) {
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

    const body = await request.json() as CategoryFormData
    const { success } = categoryFormSchema.safeParse(body);
    
    if(!success) {
        return new NextResponse("Invalid data", {
            status: 400
        });
    }

    const { name, billboardId } = body;

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

        const numCategoryId = parseInt(params.categoryId);

        if(Number.isNaN(numCategoryId)) {
            return new NextResponse("Invalid billboard id", {
                status: 400
            });
        }

        const numBillBoardId = parseInt(billboardId);

        if(Number.isNaN(numBillBoardId)) {
            return new NextResponse("Invalid billboardId", {
                status: 400
            });
        }

        await db.update(category).set({
            name,
            billBoardId: numBillBoardId,
            updatedAt: new Date()
        }).where(and(eq(category.id, numCategoryId), eq(category.storeId, id)))

        return new NextResponse("Billboard updated");

    } catch (error) {
        console.log(["category_update"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function DELETE(_: Request,
    { params } : {
        params: {
            storeId: string;
            categoryId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.categoryId) {
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

        const numCategoryId = parseInt(params.categoryId);
        if(Number.isNaN(numCategoryId)) {
            return new NextResponse("Invalid category id", {
                status: 400
            });
        }
        
        await db.delete(category)
                .where(and(
                    eq(category.storeId, id), 
                    eq(category.id, numCategoryId)
                ));
        return NextResponse.json(numCategoryId);

    } catch (error) {
        console.log(["category_delete"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }  

}
