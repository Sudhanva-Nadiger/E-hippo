import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { color } from "@/lib/schema";
import { ColorFormData, colorFormSchema } from "@/lib/zodSchemas";
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

        const body = await request.json() as ColorFormData;
        const { success } = colorFormSchema.safeParse(body);
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

        const newColor = await db.insert(color).values({
            name: body.name,
            value: body.value,
            storeId: id,
            updatedAt: new Date(),
        }).returning();

        console.log("new color insert api route", newColor);
        
        return NextResponse.json(newColor[0]);

    } catch (error) {
        console.log("color-Post", error);
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

        const colors = await db.select().from(color).where(eq(color.storeId, id));

        console.log("new color get api route");
        
        return NextResponse.json(colors);

    } catch (error) {
        console.log("Color_GET", error);
        return new NextResponse("Internal error", {
            status: 500
        })
    }
}