import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";

export default function EmptyCart() {
    return (
        <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div
              aria-hidden='true'
              className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                src='/hippo-empty-cart.png'
                fill
                alt='empty shopping cart hippo'
              />
            </div>
            <div className='text-xl font-semibold'>
              Your cart is empty
            </div>
            <Button variant={"secondary"} asChild>
              <p
                className={buttonVariants({
                  size: 'sm',
                  className:
                    'text-sm text-muted-foreground',
                })}>
                Add items to your cart to checkout
              </p>
            </Button>
          </div>
    )
}