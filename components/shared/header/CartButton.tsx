import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/actions/cart.actions";

async function CartButton() {
  const cart = await getCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="group">
      <Button
        variant="ghost"
        size="icon-lg"
        className="relative rounded-2xl hover:bg-accent/70 hover:text-primary transition-all duration-300"
      >
        <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
        {itemCount > 0 && (
          <span className="absolute -top-0.5 -left-0.5 flex min-w-5.5 h-5.5 items-center justify-center rounded-full bg-linear-to-br from-rose-500 to-pink-600 text-[11px] font-black text-white shadow-lg shadow-rose-500/30 animate-bounce-gentle border-2 border-background dark:border-background px-1.5">
            {itemCount > 99 ? "۹۹+" : itemCount.toLocaleString("fa-IR")}
          </span>
        )}
      </Button>
    </Link>
  );
}

export default CartButton;
