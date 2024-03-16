'use client'

import { ShoppingCart } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Separator } from './ui/separator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import { useCart } from '@/hooks/use-cart'
import { ScrollArea } from './ui/scroll-area'
// import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import CartItem from './CartItem'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import EmptyCart from './EmptyCart'

export default function Cart() {
  const { items } = useCart()
  const itemCount = items.length

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const searchParams = useSearchParams();
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

  const cartTotal = items.reduce(
    (total, { price }) => total + parseFloat(price),
    0
  )

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
        />
        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <ScrollArea>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href='/cart'
                  className={buttonVariants({
                    className: 'w-full',
                  })}>
                  Continue to Checkout
                </Link>
              </SheetTrigger>
            </SheetFooter>

            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-sm'>
                <h1 className='text-center font-extrabold'>Order Summary</h1>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Order total</span>
                  <span className='font-bold'>
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex w-full flex-col pr-6'>
              <ScrollArea>
                {items.map((item) => (
                  <CartItem
                    data={item}
                    key={item.id}
                  />
                ))}
              </ScrollArea>
            </div>
          </ScrollArea>
        ) : (
          <EmptyCart />
        )}
      </SheetContent>
    </Sheet>
  )
}