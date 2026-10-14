import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import UserButton from "./UserButton";
import CartButton from "./CartButton";
import { ShoppingBag, Sparkles } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="flex justify-between items-center flex-1 max-w-7xl py-3 md:py-4 px-4 md:px-10 w-full mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02]">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl gradient-primary blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                <ShoppingBag className="w-5 h-5 md:w-5.5 md:h-5.5 text-white" strokeWidth={2.2} />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-lg md:text-xl tracking-tight flex items-center gap-1.5">
                فروشگاه
                <Sparkles className="w-3.5 h-3.5 text-primary animate-bounce-gentle" strokeWidth={2.5} />
              </span>
              <span className="text-[10px] md:text-[11px] text-muted-foreground font-medium hidden sm:block">
                تجربه خرید مدرن
              </span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-1 mx-4 lg:mx-8">
          {[
            { href: "/", label: "خانه" },
            { href: "/product", label: "محصولات" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-accent/70 group"
            >
              {item.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 gradient-primary rounded-full transition-all duration-300 group-hover:w-6" />
            </Link>
          ))}
        </nav>
        <div className="space-x-0.5 md:space-x-1 flex items-center gap-0.5 md:gap-1">
          <ThemeToggle />
          <CartButton />
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
