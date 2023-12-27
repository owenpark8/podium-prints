"use client";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Cart = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { items } = useCart();
  const itemCount = items.length;
  const total = items.reduce((total, { product }) => total + product.price, 0);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2 pr-6 lg:pr-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-black group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium group-hover:text-gray-500">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                {/* <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div> */}
                {/* <div className="flex">
                  <span className="flex-1">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div> */}
                {/* <div className="flex">
                  <span className="flex-1">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div> */}
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-top pt-20 pr-2 space-y-1">
            <p className="text-xl font-semibold"> Your cart is empty.</p>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Continue shopping &rarr;
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
