import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { size } from "@/lib/schema";
import { SizeFormData, sizeFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params } : {
        params: {
            storeId: string;
            sizeId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.sizeId) {
        return new NextResponse("Size id is required", {
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

        const numSizeId = parseInt(params.sizeId);
        if(Number.isNaN(numSizeId)) {
            return new NextResponse("Invalid size id", {
                status: 400
            });
        }

        const [res] = await db.select()
                                  .from(size)
                                  .where(and(
                                        eq(size.id, numSizeId), 
                                        eq(size.storeId, id)
                                    ));
        return NextResponse.json(res);

    } catch (error) {
        console.log(["size_get"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function PATCH(request: Request,
    { params } : {
        params: {
            storeId: string;
            sizeId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.sizeId) {
        return new NextResponse("size id is required", {
            status: 400
        });
    }

    const { userId } = auth();

    if(!userId) {
        return new NextResponse("Unauthorized", {
            status: 401
        });
    }

    const body = await request.json() as SizeFormData;
    const { success } = sizeFormSchema.safeParse(body);
    
    if(!success) {
        return new NextResponse("Invalid data", {
            status: 400
        });
    }

    const { name, value } = body;

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

        const numSizeId = parseInt(params.sizeId);
        if(Number.isNaN(numSizeId)) {
            return new NextResponse("Invalid size id", {
                status: 400
            });
        }

        await db.update(size).set({
            name,
            value,
            updatedAt: new Date()
        }).where(and(eq(size.id, numSizeId), eq(size.storeId, id))).returning()

        return new NextResponse("Size updated");

    } catch (error) {
        console.log(["size_patch"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function DELETE(_: Request,
    { params } : {
        params: {
            storeId: string;
            sizeId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.sizeId) {
        return new NextResponse("size id is required", {
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

        const numSizeId = parseInt(params.sizeId);
        if(Number.isNaN(numSizeId)) {
            return new NextResponse("Invalid size id", {
                status: 400
            });
        }
        
        await db.delete(size)
                .where(and(
                    eq(size.storeId, id), 
                    eq(size.id, numSizeId)
                ));
        return NextResponse.json(numSizeId);

    } catch (error) {
        console.log(["size_delete"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }  

}
