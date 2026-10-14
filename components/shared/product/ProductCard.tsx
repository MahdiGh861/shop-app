import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Product } from "@/types";
import {  Eye, Package } from "lucide-react";
import AddToCart from "./addToCart";

function ProductCard({ product, cartQuantity = 0 }: { product: Product; cartQuantity?: number }) {
  const hasDiscount = false;
  return (
    <Card className="group w-full max-w-sm pt-0 shadow-soft hover:shadow-soft-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 overflow-hidden border border-border/50 bg-card p-0">
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-linear-to-br from-muted/50 via-background to-accent/30">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-t from-background/90 via-background/10 to-transparent z-10 pointer-events-none" />
          <Image
            src={product.image}
            alt={product.name}
            height={400}
            width={400}
            priority={true}
            className="object-contain h-full w-full p-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 rounded-md"
          />
        </Link>
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          {product.stock > 0 && product.stock <= 5 && (
            <Badge variant="destructive" className="text-[10px] font-bold shadow-soft animate-pulse-subtle">
              {product.stock} عدد باقیمانده
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-linear-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold border-0 shadow-soft">
              ۳۰٪ تخفیف
            </Badge>
          )}
        </div>
        <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col gap-1.5">
          <Link
            href={`/product/${product.slug}`}
            className="w-9 h-9 rounded-full glass border border-white/20 shadow-soft-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground text-foreground transition-all duration-300 backdrop-blur-md"
          >
            <Eye className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
      <CardContent className="p-4 md:p-5 grid gap-3 relative">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="text-[11px] font-medium bg-accent/70 hover:bg-accent px-2.5 py-1 border-0">
            {product.brand}
          </Badge>
          {product.stock > 0 ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-green-600 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              موجود
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-medium text-destructive">
              <Package className="w-3 h-3" strokeWidth={2} />
              ناموجود
            </span>
          )}
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="text-sm md:text-base font-bold text-foreground hover:text-primary transition-colors duration-300 line-clamp-1 leading-snug"
        >
          {product.name}
        </Link>
        <div className="pt-1 mt-auto border-t border-border/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through opacity-70">
                  {(Number(product.price) * 1.3).toLocaleString("fa-IR")}
                </span>
              )}
              {product.stock > 0 ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base md:text-lg font-black tracking-tight gradient-text tabular-nums">
                    {Number(product.price).toLocaleString("fa-IR")}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">تومان</span>
                </div>
              ) : (
                <span className="text-sm font-bold text-destructive">ناموجود</span>
              )}
            </div>
            {product.stock > 0 && (
              <AddToCart productId={product.id} stock={product.stock} compact />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
