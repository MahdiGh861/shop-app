"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Plus,
  Check,
  Loader2,
  AlertTriangle,
  LogIn,
  X,
  Minus,
  Trash2,
} from "lucide-react";
import { addItemToCart, updateItemQuantity, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface AddToCartProps {
  productId: string;
  stock: number;
  compact?: boolean;
  initialQuantity?: number;
}

type ToastStatus = "idle" | "success" | "error" | "auth";

export default function AddToCart({
  productId,
  stock,
  compact = false,
  initialQuantity = 0,
}: AddToCartProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [toast, setToast] = useState<{ status: ToastStatus; message: string } | null>(null);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(hideToast, 4200);
    return () => clearTimeout(timeout);
  }, [toast, hideToast]);

  const showToast = useCallback((status: ToastStatus, message: string) => {
    setToast({ status, message });
  }, []);

  const handleAdd = () => {
    if (stock < 1) {
      showToast("error", "متاسفانه این محصول در حال حاضر موجود نمی‌باشد.");
      return;
    }

    setAdded(false);
    startTransition(async () => {
      try {
        const res = await addItemToCart(productId, 1);

        if (res?.success) {
          setQuantity((q) => q + 1);
          setAdded(true);
          showToast("success", res.message || "محصول با موفقیت اضافه شد.");
          setTimeout(() => setAdded(false), 1500);
        } else {
          if (res?.redirectTo === "/sign-in") {
            showToast("auth", res.message || "لطفاً ابتدا وارد حساب شوید.");
          } else {
            showToast("error", res?.message || "عملیات ناموفق بود.");
          }
        }
        router.refresh();
      } catch {
        showToast("error", "خطای شبکه. لطفاً اتصال اینترنت را بررسی و دوباره تلاش کنید.");
      }
    });
  };

  const handleIncrement = () => {
    if (quantity >= stock) {
      showToast("error", `حداکثر ${stock.toLocaleString("fa-IR")} عدد از این محصول موجود است.`);
      return;
    }
    startTransition(async () => {
      try {
        const res = await updateItemQuantity(productId, quantity + 1);
        if (res?.success) {
          setQuantity((q) => q + 1);
        } else {
          showToast("error", res?.message || "عملیات ناموفق بود.");
        }
        router.refresh();
      } catch {
        showToast("error", "خطای شبکه. لطفاً دوباره تلاش کنید.");
      }
    });
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      handleRemove();
      return;
    }
    startTransition(async () => {
      try {
        const res = await updateItemQuantity(productId, quantity - 1);
        if (res?.success) {
          setQuantity((q) => q - 1);
        } else {
          showToast("error", res?.message || "عملیات ناموفق بود.");
        }
        router.refresh();
      } catch {
        showToast("error", "خطای شبکه. لطفاً دوباره تلاش کنید.");
      }
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      try {
        const res = await removeItemFromCart(productId);
        if (res?.success) {
          setQuantity(0);
          showToast("success", res.message || "محصول از سبد خرید حذف شد.");
        } else {
          showToast("error", res?.message || "عملیات حذف ناموفق بود.");
        }
        router.refresh();
      } catch {
        showToast("error", "خطای شبکه. لطفاً دوباره تلاش کنید.");
      }
    });
  };

  const isInCart = quantity > 0;

  return (
    <>
      {isInCart ? (
        <div
          className={cn(
            "flex items-center gap-1.5 p-1 rounded-2xl bg-muted/70 border border-border/50 shadow-sm select-none animate-scale-in",
            !compact && "p-1.5 gap-2"
          )}
        >
          <button
            type="button"
            onClick={handleDecrement}
            disabled={isPending}
            aria-label="کاهش تعداد"
            className={cn(
              "rounded-xl flex items-center justify-center transition-all duration-200",
              "hover:bg-background hover:text-primary active:scale-90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              compact ? "w-8 h-8 md:w-9 md:h-9" : "w-11 h-11 md:w-12 md:h-12"
            )}
          >
            {isPending ? (
              <Loader2 className={cn("animate-spin", compact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2.5} />
            ) : quantity <= 1 ? (
              <Trash2 className={cn("text-destructive", compact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2.2} />
            ) : (
              <Minus className={cn(compact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2.5} />
            )}
          </button>

          <div
            className={cn(
              "flex items-center justify-center rounded-xl bg-background shadow-sm font-black tabular-nums border border-border/40",
              compact
                ? "min-w-[2.2rem] md:min-w-10 h-8 md:h-9 text-sm md:text-base"
                : "min-w-12 md:min-w-14 h-11 md:h-12 text-lg md:text-xl"
            )}
          >
            {quantity.toLocaleString("fa-IR")}
          </div>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={isPending || quantity >= stock}
            aria-label="افزایش تعداد"
            className={cn(
              "rounded-xl flex items-center justify-center transition-all duration-200",
              "active:scale-90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "gradient-primary text-white hover:opacity-90",
              compact ? "w-8 h-8 md:w-9 md:h-9" : "w-11 h-11 md:w-12 md:h-12"
            )}
          >
            <Plus className={cn(compact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2.8} />
          </button>
        </div>
      ) : (
        <Button
          onClick={handleAdd}
          disabled={isPending || added || stock < 1}
          size={compact ? "icon" : "lg"}
          aria-label={compact ? "افزودن به سبد خرید" : undefined}
          className={cn(
            "relative overflow-hidden transition-all duration-300 group select-none",
            compact
              ? "w-10 h-10 rounded-xl shadow-soft hover:shadow-glow shrink-0 gradient-primary text-white border-0 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              : "shadow-soft-xl hover:shadow-glow w-full md:w-auto px-8 py-6 text-base gradient-primary text-white border-0 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          <span
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              isPending && "opacity-0 translate-y-4",
              added && "opacity-0 -translate-y-4"
            )}
          >
            {compact ? (
              <ShoppingCart className="w-4.5 h-4.5" strokeWidth={2.2} />
            ) : (
              <>
                <Plus className="w-5 h-5" strokeWidth={2.5} />
                <span className="font-bold tracking-tight">افزودن به سبد خرید</span>
                <ShoppingCart className="w-5 h-5" strokeWidth={2.2} />
              </>
            )}
          </span>

          {isPending && (
            <Loader2 className="absolute inset-0 m-auto w-5 h-5 animate-spin text-white" />
          )}

          {added && !isPending && (
            <span className="absolute inset-0 flex items-center justify-center gap-2 bg-green-500 text-white animate-scale-in">
              <Check className="w-5 h-5" strokeWidth={3} />
              {!compact && <span className="font-black tracking-wide">افزوده شد</span>}
            </span>
          )}
        </Button>
      )}

      {/* Status Toast */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-6 z-100 flex justify-center px-4 transition-all duration-500 ease-out",
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
                "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/70 dark:border-rose-800/60 dark:text-rose-200",
              toast.status === "auth" &&
                "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/60 dark:border-amber-700/50 dark:text-amber-200"
            )}
          >
            {toast.status === "success" && (
              <div className="absolute inset-y-0 right-0 w-1.5 bg-linear-to-b from-green-400 to-emerald-500" />
            )}
            {toast.status === "error" && (
              <div className="absolute inset-y-0 right-0 w-1.5 bg-linear-to-b from-rose-400 to-red-500" />
            )}
            {toast.status === "auth" && (
              <div className="absolute inset-y-0 right-0 w-1.5 bg-linear-to-b from-amber-400 to-orange-500" />
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
                  toast.status === "success" && "bg-green-500/15 text-green-600 dark:text-green-400",
                  toast.status === "error" && "bg-rose-500/15 text-rose-600 dark:text-rose-400",
                  toast.status === "auth" && "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                )}
              >
                {toast.status === "success" ? (
                  <Check className="w-5 h-5" strokeWidth={2.8} />
                ) : toast.status === "auth" ? (
                  <LogIn className="w-5 h-5" strokeWidth={2.2} />
                ) : (
                  <AlertTriangle className="w-5 h-5" strokeWidth={2.2} />
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                <p className="text-sm font-black leading-snug">
                  {toast.status === "success" && "عملیات موفق"}
                  {toast.status === "error" && "خطا در انجام عملیات"}
                  {toast.status === "auth" && "نیاز به ورود به سیستم"}
                </p>
                <p className="text-xs md:text-sm leading-relaxed opacity-95 wrap-break-word">
                  {toast.message}
                </p>
                {toast.status === "auth" && (
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-1.5 mt-1 text-xs md:text-sm font-black bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-amber-950 px-3 py-1.5 rounded-lg transition-colors shadow-soft"
                  >
                    <LogIn className="w-3.5 h-3.5" strokeWidth={2.5} />
                    وارد حساب شوید
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
