import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { color } from "@/lib/schema";
import { ColorFormData, colorFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params } : {
        params: {
            storeId: string;
            colorId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.colorId) {
        return new NextResponse("Color id is required", {
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

        const numColorId = parseInt(params.colorId);
        if(Number.isNaN(numColorId)) {
            return new NextResponse("Invalid color id", {
                status: 400
            });
        }

        const [res] = await db.select()
                                  .from(color)
                                  .where(and(
                                        eq(color.id, numColorId), 
                                        eq(color.storeId, id)
                                    ));
        return NextResponse.json(res);

    } catch (error) {
        console.log(["color_get"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function PATCH(request: Request,
    { params } : {
        params: {
            storeId: string;
            colorId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.colorId) {
        return new NextResponse("color id is required", {
            status: 400
        });
    }

    const { userId } = auth();

    if(!userId) {
        return new NextResponse("Unauthorized", {
            status: 401
        });
    }

    const body = await request.json() as ColorFormData;
    const { success } = colorFormSchema.safeParse(body);
    
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

        const numColorId = parseInt(params.colorId);
        if(Number.isNaN(numColorId)) {
            return new NextResponse("Invalid color id", {
                status: 400
            });
        }

        await db.update(color).set({
            name,
            value,
            updatedAt: new Date()
        }).where(and(eq(color.id, numColorId), eq(color.storeId, id))).returning()

        return new NextResponse("Color updated");

    } catch (error) {
        console.log(["color_patch"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function DELETE(_: Request,
    { params } : {
        params: {
            storeId: string;
            colorId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.colorId) {
        return new NextResponse("color id is required", {
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

        const numColorId = parseInt(params.colorId);
        if(Number.isNaN(numColorId)) {
            return new NextResponse("Invalid color id", {
                status: 400
            });
        }
        
        await db.delete(color)
                .where(and(
                    eq(color.storeId, id), 
                    eq(color.id, numColorId)
                ));
        return NextResponse.json(numColorId);

    } catch (error) {
        console.log(["color_delete"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }  

}
