"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "@/lib/actions/cart.actions";
import type { cart } from "@/types";

function Cart({ cart }: { cart: cart }) {
  const [isPending, startTransition] = useTransition();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
        <Button>
          <Link href="/">مشاهده محصولات</Link>
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    startTransition(async () => {
      await updateItemQuantity(productId, quantity);
    });
  };

  const handleRemove = (productId: string) => {
    startTransition(async () => {
      await removeItemFromCart(productId);
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 border rounded-lg p-4 items-center"
          >
            <Link href={`/product/${item.slug}`}>
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md"
              />
            </Link>
            <div className="flex-1 grid gap-2">
              <Link
                href={`/product/${item.slug}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {item.price} تومان
              </p>
              <div className="flex items-center gap-3">
                <select
                  value={item.quantity}
                  disabled={isPending}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.productId,
                      Number(e.target.value)
                    )
                  }
                  className="h-8 rounded-lg border border-border bg-background px-2 text-sm"
                >
                  {Array.from(
                    { length: item.stock },
                    (_, i) => i + 1
                  ).map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                  className="cursor-pointer"
                  onClick={() => handleRemove(item.productId)}
                >
                  حذف
                </Button>
              </div>
            </div>
            <p className="font-bold whitespace-nowrap">
              {item.price * item.quantity} تومان
            </p>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-6 h-fit space-y-4">
        <h2 className="text-lg font-bold">خلاصه سفارش</h2>
        <div className="flex justify-between text-sm">
          <span>جمع اقلام</span>
          <span>{cart.itemsPrice} تومان</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-4">
          <span>مجموع</span>
          <span>{cart.totalPrice} تومان</span>
        </div>
        <Link href="/checkout" className="w-full">
          <Button className="w-full cursor-pointer">
            ادامه و تکمیل خرید
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
