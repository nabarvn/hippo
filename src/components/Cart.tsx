"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Sheet, Separator } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button";

import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";

const Cart = () => {
  const fee = 1;

  // mocked value
  const itemCount = 0;

  return (
    <Sheet>
      <SheetTrigger className='group flex items-center -m-2 p-2'>
        <ShoppingCart
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
        />

        <span className='text-sm font-medium text-gray-700 group-hover:text-gray-800 ml-2'>
          {/* TODO: display `itemCount` conditionally */}
        </span>
      </SheetTrigger>

      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              {/* TODO: display cart items */}
            </div>

            <div className='space-y-4 pr-6'>
              <Separator />

              <div className='space-y-1.5 text-sm'>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>Free</span>
                </div>

                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>

                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{/* TODO: display cart total with fee */}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div
              aria-hidden='true'
              className='relative h-60 w-60 text-muted-foreground mb-4'
            >
              <Image
                fill
                src='/hippo-empty-cart.png'
                alt='empty shopping cart hippo'
              />
            </div>

            <div className='text-xl font-semibold'>Your cart is empty</div>

            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  size: "sm",
                  variant: "link",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Put items in your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
