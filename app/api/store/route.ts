import { db } from "@/lib/db";
import { store } from "@/lib/schema";
import { createStoreFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
export async function POST(request: Request) {
    try {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {
                status: 401
            });
        }

        const body = await request.json();
        const { success } = createStoreFormSchema.safeParse(body);
        if(!success) {
            return new NextResponse("Invalid input", {
                status: 400
            });
        }

        const newStore = await db.insert(store).values({
            name: body.name as string,
            userId: userId,
            updatedAt: new Date(),
        }).returning();

        console.log("newstore insert api route", newStore);
        
        return NextResponse.json(newStore[0]);

    } catch (error) {
        console.log("STORES_POST", error);
        return new NextResponse("Internal error", {
            status: 500
        })
    }
}