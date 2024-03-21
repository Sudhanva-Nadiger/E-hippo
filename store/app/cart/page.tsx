"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/Currency";
import { useCart } from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CartItem from "@/components/CartItem";
import EmptyCart from "@/components/EmptyCart";

export default function CartPage() {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success('Payment completed.');
            removeAll();
        }

        if (searchParams.get('canceled')) {
            toast.error('Something went wrong.');
        }
    }, [searchParams, removeAll]);

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0);

    const onCheckout = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productIds: items.map((item) => item.id),
            }),
        });

        window.location = (await response.json()).url;
    }

    return (
        <div className="bg-white">
            <MaxWidthWrapper>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {items.length === 0 && <EmptyCart />}
                            <ul>
                                {items.map((item) => (
                                    <CartItem key={item.id} data={item} />
                                ))}
                            </ul>
                        </div>
                        <div
                            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                        >
                            <h2 className="text-lg font-medium text-gray-900">
                                Order summary
                            </h2>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <div className="text-base font-medium text-gray-900">Order total</div>
                                    <Currency value={totalPrice} />
                                </div>
                            </div>
                            <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}