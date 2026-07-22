"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createOrder } from "@/lib/actions/order.actions";
import type { cart, Address } from "@/types";
import Image from "next/image";

interface CheckoutFormProps {
  cart: cart;
  address: Address | null;
}

export default function CheckoutForm({ cart, address }: CheckoutFormProps) {
  const [state, formAction, isPending] = useActionState(createOrder, {
    success: false,
    message: "",
  });

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>آدرس ارسال</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">نام کامل</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={address?.fullName || ""}
                placeholder="نام کامل خود را وارد کنید"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">آدرس خیابان</Label>
              <Input
                id="street"
                name="street"
                defaultValue={address?.street || ""}
                placeholder="آدرس کامل را وارد کنید"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">شهر</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={address?.city || ""}
                  placeholder="شهر"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">کد پستی</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  defaultValue={address?.postalCode || ""}
                  placeholder="کد پستی"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">کشور</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={address?.country || "ایران"}
                  placeholder="کشور"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">شماره تلفن</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={address?.phone || ""}
                  placeholder="شماره تلفن"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>روش پرداخت</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input
                type="radio"
                name="paymentMethod"
                value="پرداخت درب منزل"
                defaultChecked
                className="accent-primary"
              />
              <span>پرداخت درب منزل</span>
            </label>
            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input
                type="radio"
                name="paymentMethod"
                value="پرداخت آنلاین"
                className="accent-primary"
              />
              <span>پرداخت آنلاین</span>
            </label>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>خلاصه سفارش</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex gap-3 items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × {item.price.toLocaleString("fa-IR")} تومان
                  </p>
                </div>
                <p className="text-sm font-bold whitespace-nowrap">
                  {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                </p>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>جمع اقلام</span>
                <span>{cart.itemsPrice.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>مجموع</span>
                <span>{cart.totalPrice.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {state.message && !state.success && (
          <p className="text-sm text-destructive text-center">{state.message}</p>
        )}

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
          size="lg"
        >
          {isPending ? "در حال ثبت سفارش..." : "ثبت سفارش"}
        </Button>
      </div>
    </form>
  );
}
