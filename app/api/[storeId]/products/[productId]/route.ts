import { fetchStore } from "@/lib/actions";
import { db } from "@/lib/db";
import { image, product } from "@/lib/schema";
import { ProductFormData, productFormSchema } from "@/lib/zodSchemas";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params } : {
        params: {
            storeId: string;
            productId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.productId) {
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

        const numProductId = parseInt(params.productId);
        if(Number.isNaN(numProductId)) {
            return new NextResponse("Invalid product id", {
                status: 400
            });
        }

        const resProduct = await db.query.product.findFirst({
            where: (product, {and, eq}) => and(eq(product.id, numProductId), eq(product.storeId, id)),
            with: {
                category: true,
                color: true,
                images: true,
                size: true
            }
        });
        return NextResponse.json(resProduct);

    } catch (error) {
        console.log(["Product_Get"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function PATCH(request: Request,
    { params } : {
        params: {
            storeId: string;
            productId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.productId) {
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

    const body = await request.json() as ProductFormData;
    const { success } = productFormSchema.safeParse(body);
    
    if(!success) {
        return new NextResponse("Invalid data", {
            status: 400
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

        const numProductId = parseInt(params.productId);
        if(Number.isNaN(numProductId)) {
            return new NextResponse("Invalid product id", {
                status: 400
            });
        }

        await db.update(product).set({
            categoryId,
            colorId,
            sizeId,
            name,
            price: price.toString(),
            description,
            isArchived,
            isFeatured,
            updatedAt: new Date()
        }).where(and(eq(product.id, numProductId), eq(product.storeId, id)))

        await db.delete(image).where(eq(image.productId, numProductId));

        await db.insert(image).values(images.map(item => {
            return {
                productId: numProductId,
                url: item.url
            }
        }));

        return new NextResponse("Product");

    } catch (error) {
        console.log(["product_get"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}


export async function DELETE(_: Request,
    { params } : {
        params: {
            storeId: string;
            productId: string;
        }
    }
) {
    if(!params.storeId) {
        return new NextResponse("Store id is required", {
            status: 400
        });
    }

    if(!params.productId) {
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

        const numProductId = parseInt(params.productId);
        if(Number.isNaN(numProductId)) {
            return new NextResponse("Invalid product id", {
                status: 400
            });
        }
        
        await db.delete(product)
                .where(and(
                    eq(product.storeId, id), 
                    eq(product.id, numProductId)
                ));

        await db.delete(image).where(eq(image.productId, numProductId));

        return NextResponse.json(numProductId);

    } catch (error) {
        console.log(["products_delete"], error);
        return new NextResponse("Internal error", { status: 500 }); 
    }  

}
