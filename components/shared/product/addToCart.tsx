"use client";

import { useActionState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";

function AddToCart({
  productId,
  stock,
}: {
  productId: string;
  stock: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [data, action, isPending] = useActionState(addItemToCart, {
    success: false,
    message: "",
  });

  const signInUrl = `/sign-in?callbackUrl=${encodeURIComponent(pathname)}`;

  if (data?.message === "لطفاً ابتدا وارد حساب کاربری شوید.") {
    return (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          برای افزودن به سبد خرید باید وارد شوید.
        </p>
        <Button>
          <Link href={signInUrl}>ورود</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="productId" value={productId} />
      <div className="flex items-center gap-3">
        <select
          name="quantity"
          defaultValue={1}
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
        >
          {Array.from({ length: Math.min(stock, 10) }, (_, i) => i + 1).map(
            (qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            )
          )}
        </select>
        <Button type="submit" disabled={isPending} className="cursor-pointer">
          {isPending ? "در حال افزودن..." : "افزودن به سبد خرید"}
        </Button>
      </div>
      {data?.message && (
        <p
          className={`text-sm ${
            data.success ? "text-green-600" : "text-destructive"
          }`}
        >
          {data.message}
        </p>
      )}
      {data?.success && (
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => router.push("/cart")}
        >
          مشاهده سبد خرید
        </Button>
      )}
    </form>
  );
}

export default AddToCart;
