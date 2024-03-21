import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { billBoards, image, product, store } from "@/lib/schema";
import { ProductFormData, productFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
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

        const body = await request.json() as ProductFormData;
        const { success } = productFormSchema.safeParse(body);

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

        const { 
            categoryId, 
            colorId, 
            images, 
            name, 
            price, 
            sizeId, 
            description, 
            isArchived, 
            isFeatured
        } = body;

        const newProduct = await db.insert(product).values({
            categoryId, 
            colorId,  
            name, 
            price: price.toString(), 
            sizeId, 
            description, 
            isArchived, 
            isFeatured,
            storeId: id,
        }).returning();

        const insertedImages = await db.insert(image).values(images.map(item => {
            return {
                productId: newProduct[0].id,
                url: item.url
            }
        })).returning();

        const productWithImages = {
            ...newProduct[0],
            images: insertedImages
        }

        console.log("new product insert api route", productWithImages);
        
        return NextResponse.json(productWithImages);

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
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const colorId = searchParams.get("colorId");
    const sizeId = searchParams.get("sizeId");
    const isFeatured = searchParams.get("isFeatured");

    try {
        const storeId = params.storeId;
        const id = parseInt(storeId);

        if(Number.isNaN(id)) {
            return new NextResponse("Invalid storeId", {
                status: 400
            });
        }

        const products = (await db.query.product.findMany({
            where: (product, {eq, and}) => and(eq(product.storeId, id), eq(product.isArchived, false)),
            with: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy(fields, operators) {
                return operators.desc(fields.createdAt);
            },
        })).filter((product) => {
            let ans = true;

            if(categoryId) {
                ans = product.categoryId === parseInt(categoryId);
            }

            if(colorId) {
                ans = ans && product.colorId === parseInt(colorId);
            }

            if(sizeId) {
                ans = ans && product.sizeId === parseInt(sizeId);
            }

            if(isFeatured) {
                ans = ans && product.isFeatured === (isFeatured === "true");
            }

            return ans;
        })

        console.log("prodcut get api route");
        
        return NextResponse.json(products);

    } catch (error) {
        console.log("PRODUCTS_GET", error);
        return new NextResponse("Internal error", {
            status: 500
        })
    }
}