"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "@/lib/actions/cart.actions";
import type { cart } from "@/types";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Sparkles,
  Check,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ToastStatus = "idle" | "success" | "error";

export default function Cart({ cart }: { cart: cart }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ status: ToastStatus; message: string } | null>(null);

  const hideToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(hideToast, 3800);
    return () => clearTimeout(t);
  }, [toast, hideToast]);

  const showMessage = (status: ToastStatus, message: string) => {
    setToast({ status, message });
  };

  if (cart.items.length === 0) {
    return (
      <div className="relative text-center py-20 md:py-28 space-y-8 animate-fade-in-up">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-40 rounded-3xl" />
        <div className="relative inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] gradient-soft shadow-soft-xl mb-2">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse-subtle">
              <ShoppingCart className="w-14 h-14 md:w-20 md:h-20 text-primary/20" strokeWidth={1.5} />
            </div>
            <ShoppingCart className="relative w-14 h-14 md:w-20 md:h-20 text-primary" strokeWidth={1.8} />
          </div>
        </div>
        <div className="space-y-3 max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">سبد خرید شما خالی است</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            چقدر صحیح است که سفری خالی را آغاز نکنید! همین حالا محصولات جذاب ما را بررسی کنید.
          </p>
        </div>
        <Link href="/product">
          <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl mt-4">
            <ArrowLeft className="w-5 h-5 ml-2" strokeWidth={2.5} />
            شروع خرید
          </Button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    startTransition(async () => {
      try {
        const res = await updateItemQuantity(productId, quantity);
        if (res?.success) {
          showMessage("success", res.message);
        } else {
          showMessage("error", res?.message || "عملیات ناموفق بود.");
        }
        router.refresh();
      } catch {
        showMessage("error", "خطای شبکه. لطفاً دوباره تلاش کنید.");
      }
    });
  };

  const handleRemove = (productId: string) => {
    startTransition(async () => {
      try {
        const res = await removeItemFromCart(productId);
        if (res?.success) {
          showMessage("success", res.message);
        } else {
          showMessage("error", res?.message || "عملیات حذف ناموفق بود.");
        }
        router.refresh();
      } catch {
        showMessage("error", "خطای شبکه. لطفاً دوباره تلاش کنید.");
      }
    });
  };

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">سبد خرید من</h1>
          <p className="text-muted-foreground">
            <span className="font-bold text-foreground">{totalItems.toLocaleString("fa-IR")}</span>
            <span className="mx-1.5">محصول در سبد شماست</span>
          </p>
        </div>
        <Link href="/product">
          <Button variant="outline" size="lg" className="rounded-2xl">
            ادامه خرید
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {isPending && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-muted/60 border border-border/50 text-sm font-bold text-muted-foreground animate-fade-in">
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
              در حال به‌روزرسانی سبد خرید...
            </div>
          )}
          {cart.items.map((item, idx) => (
            <Card
              key={item.productId}
              className={cn(
                "group overflow-hidden border-border/60 shadow-soft hover:shadow-soft-xl transition-all duration-500",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <CardContent className="p-4 md:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link
                  href={`/product/${item.slug}`}
                  className="relative shrink-0 w-full sm:w-28 md:w-32 aspect-square sm:aspect-auto sm:h-28 md:h-32 rounded-2xl overflow-hidden bg-linear-to-br from-muted via-background to-accent/40 group-hover:shadow-soft transition-shadow duration-300"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex-1 min-w-0 grid gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <Badge variant="secondary" className="w-fit mb-2 text-[11px] font-bold bg-accent/70 border-0">
                        {item.brand || "محصول ویژه"}
                      </Badge>
                      <Link
                        href={`/product/${item.slug}`}
                        className="block font-bold text-base md:text-lg hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={isPending}
                      onClick={() => handleRemove(item.productId)}
                      className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-300"
                      title="حذف از سبد"
                    >
                      <Trash2 className="w-4.5 h-4.5" strokeWidth={2} />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground font-medium">
                    قیمت واحد:
                    <span className="text-foreground mr-1 font-bold tabular-nums">
                      {Number(item.price).toLocaleString("fa-IR")}
                      <span className="text-[11px] text-muted-foreground mr-1 font-normal">تومان</span>
                    </span>
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 mt-auto">
                    <div className="flex items-center gap-2 p-1 rounded-2xl bg-muted/70 border border-border/40 shadow-sm">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={isPending || item.quantity <= 1}
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="rounded-xl w-9 h-9 hover:bg-background hover:text-primary transition-all duration-200"
                      >
                        <Minus className="w-4 h-4" strokeWidth={2.5} />
                      </Button>
                      <div className="w-12 h-9 flex items-center justify-center rounded-xl bg-background shadow-sm text-base font-black tabular-nums border border-border/40">
                        {item.quantity.toLocaleString("fa-IR")}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={isPending || item.quantity >= item.stock}
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="rounded-xl w-9 h-9 hover:bg-background hover:text-primary transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground font-medium">جمع کل</p>
                      <p className="font-black text-lg md:text-xl gradient-text tabular-nums">
                        {Number(item.price * item.quantity).toLocaleString("fa-IR")}
                        <span className="text-xs text-muted-foreground mr-1 font-normal">تومان</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 h-fit space-y-4">
          <Card className="overflow-hidden border-border/60 shadow-soft-xl">
            <div className="p-5 md:p-6 bg-linear-to-br from-accent/50 via-transparent to-transparent border-b border-border/40">
              <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-primary" strokeWidth={2.5} />
                خلاصه سفارش
              </h2>
            </div>
            <CardContent className="p-5 md:p-6 space-y-5">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">جمع اقلام ({totalItems.toLocaleString("fa-IR")})</span>
                  <span className="font-bold tabular-nums">
                    {Number(cart.itemsPrice).toLocaleString("fa-IR")}
                    <span className="text-[11px] text-muted-foreground mr-1 font-normal">تومان</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">هزینه ارسال</span>
                  <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Truck className="w-4 h-4" strokeWidth={2.5} />
                    رایگان
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">تخفیف</span>
                  <span className="font-bold tabular-nums">۰ تومان</span>
                </div>
              </div>

              <div className="h-px w-full bg-linear-to-l from-transparent via-border to-transparent" />

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-sm text-muted-foreground font-medium">مبلغ قابل پرداخت</span>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-green-600 dark:text-green-400 font-bold">
                    <Shield className="w-3.5 h-3.5" strokeWidth={2.5} />
                    پرداخت امن
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-black text-2xl md:text-3xl gradient-text tabular-nums tracking-tight">
                    {Number(cart.totalPrice).toLocaleString("fa-IR")}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">تومان</p>
                </div>
              </div>

              <Link href="/checkout" className="block w-full pt-2">
                <Button size="lg" className="w-full h-14 text-base md:text-lg font-black rounded-2xl">
                  <CreditCard className="w-5 h-5 ml-2" strokeWidth={2.2} />
                  ادامه و تکمیل خرید
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/50 text-[11px] font-bold text-muted-foreground">
                  <Truck className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2.5} />
                  ارسال سریع
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/50 text-[11px] font-bold text-muted-foreground">
                  <Shield className="w-4 h-4 text-indigo-500 shrink-0" strokeWidth={2.5} />
                  خرید امن
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Toast */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4 transition-all duration-500 ease-out",
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {toast && (
          <div
            role="status"
            className={cn(
              "pointer-events-auto relative max-w-md w-full overflow-hidden rounded-2xl px-5 py-4 pr-14 shadow-soft-xl border animate-fade-in-up",
              toast.status === "success" &&
                "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/70 dark:border-green-800/60 dark:text-green-200",
              toast.status === "error" &&
                "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/70 dark:border-rose-800/60 dark:text-rose-200"
            )}
          >
            {toast.status === "success" && (
              <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-green-400 to-emerald-500" />
            )}
            {toast.status === "error" && (
              <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-rose-400 to-red-500" />
            )}
            <button
              onClick={hideToast}
              aria-label="بستن"
              className="absolute top-3 left-3 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-current/60 hover:text-current transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
                  toast.status === "success" &&
                    "bg-green-500/15 text-green-600 dark:text-green-400",
                  toast.status === "error" && "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                )}
              >
                {toast.status === "success" ? (
                  <Check className="w-5 h-5" strokeWidth={2.8} />
                ) : (
                  <AlertTriangle className="w-5 h-5" strokeWidth={2.2} />
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1 pt-0.5">
                <p className="text-sm font-black leading-snug">
                  {toast.status === "success" ? "عملیات موفق" : "خطا در انجام عملیات"}
                </p>
                <p className="text-xs md:text-sm leading-relaxed opacity-95 break-words">
                  {toast.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// export default Cart;
