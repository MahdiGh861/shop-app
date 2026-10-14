import React from "react";
import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import '@/app/globals.css'

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen w-full relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-violet-500/10 dark:bg-fuchsia-500/10 blur-[100px] pointer-events-none" />

      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-10 py-5">
        <Link href="/" className="inline-flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02]">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl gradient-primary blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <ShoppingBag className="w-5.5 h-5.5 text-white" strokeWidth={2.2} />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-xl tracking-tight flex items-center gap-1.5">
              فروشگاه
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              تجربه خرید مدرن
            </span>
          </div>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-10 py-10 md:py-16">
        {children}
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-10 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          تمامی حقوق برای فروشگاه محفوظ است &copy; {currentYear}
        </p>
      </footer>
    </div>
  );
}
