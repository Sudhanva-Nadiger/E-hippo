"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./ui/IconButton";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./ui/Currency";
import Link from "next/link";
import { useModalPreview } from "@/hooks/use-modal-preview";
import { MouseEventHandler } from "react";
import { useCart } from "@/hooks/use-cart";


export default function ProductCard({
    product
}: {
    product: Product
}) {
    const modalPreview = useModalPreview();
    const cart = useCart();

    const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        modalPreview.open(product);
    }

    const addToCart: MouseEventHandler<HTMLButtonElement>  = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        cart.addItem(product);
    }

    return (
        <Link href={`/product/${product.id}`}>
            <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                {/* Image & actions */}
                <div className="aspect-square rounded-xl bg-gray-100 relative">
                    <Image
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        fill
                        className="aspect-square object-cover rounded-md"
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                        <div className="flex gap-x-6 justify-center">
                            <IconButton onClick={onPreview} className="bg-white">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Expand size={"20"} className="text-gray-600" />
                                        </TooltipTrigger>
                                        <TooltipContent className="mb-2">
                                            <p>View product</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </IconButton>
                            <IconButton onClick={addToCart} className="bg-white">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ShoppingCart size={"20"} className="text-gray-600" />
                                        </TooltipTrigger>
                                        <TooltipContent className="mb-2">
                                            <p>Add to cart</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </IconButton>
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div>
                    <p className="font-semibold text-lg">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category?.name}</p>
                </div>
                {/* Price & Reiew */}
                <div className="flex items-center justify-between">
                    <Currency value={product?.price} />
                </div>
            </div>
        </Link>
    )
}