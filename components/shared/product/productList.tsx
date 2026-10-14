import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { getCart } from "@/lib/actions/cart.actions";

async function ProductList({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;

  let quantityMap = new Map<string, number>();
  try {
    const cart = await getCart();
    for (const item of cart.items) {
      quantityMap.set(item.productId, item.quantity);
    }
  } catch {
    // If cart fetch fails, just render without cart quantities
  }

  return (
    <section className="my-12 md:my-16 relative">
      {title && (
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div className="relative">
            <div className="absolute -right-3 -top-1 w-2 h-10 gradient-primary rounded-full rotate-12 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-black tracking-tight pr-5">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 pr-5">
              مجموعه‌ای منتخب از بهترین‌ها
            </p>
          </div>
        </div>
      )}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {limitedData.map((item: Product, index) => (
            <div
              key={item.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <ProductCard product={item} cartQuantity={quantityMap.get(item.id) ?? 0} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-border/70 rounded-3xl bg-muted/30">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-muted mb-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-muted-foreground" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">محصولی یافت نشد !</h2>
          <p className="text-muted-foreground text-sm">تلاش کنید کلمات دیگری را جستجو کنید</p>
        </div>
      )}
    </section>
  );
}

export default ProductList;
