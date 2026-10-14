import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, getLatestProducts } from "@/lib/actions/product.actions";
import { getCart } from "@/lib/actions/cart.actions";
import AddToCart from "@/components/shared/product/addToCart";
import ProductList from "@/components/shared/product/productList";
import { Star, Package, Truck, ShieldCheck, RotateCcw, Heart, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = (await getLatestProducts(8)).filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  let cartQuantity = 0;
  try {
    const cart = await getCart();
    cartQuantity = cart.items.find((i) => i.productId === product.id)?.quantity ?? 0;
  } catch {
    // ignore cart fetch errors
  }

  const features = [
    { icon: Truck, title: "ارسال رایگان", desc: "خرید بالای ۵۰۰ هزار تومان", color: "text-indigo-500" },
    { icon: ShieldCheck, title: "ضمانت اصالت", desc: "کالای اصل با گارانتی معتبر", color: "text-emerald-500" },
    { icon: RotateCcw, title: "۷ روز بازگشت", desc: "بدون قید و شرط بازگشت کالا", color: "text-violet-500" },
    { icon: Package, title: "بسته‌بندی ویژه", desc: "بسته‌بندی ضد ضربه و زیبا", color: "text-amber-500" },
  ];

  return (
    <div className="relative py-4 md:py-8 space-y-12 md:space-y-16 animate-fade-in-up ">
      <div className="absolute inset-x-0 top-0 -z-10 h-125 opacity-40 pointer-events-none" />

      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          صفحه اصلی
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <Link href="/product" className="hover:text-primary transition-colors duration-300 font-medium">
          محصولات
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-bold line-clamp-1">{product.name}</span>
      </nav>

      <Card className="overflow-hidden border-border/60 shadow-soft-xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="lg:col-span-2 relative overflow-hidden border-b lg:border-b-0 lg:border-l border-border/50 p-4 md:p-8 flex items-center justify-center bg-linear-to-br from-muted/50 via-background to-accent/30 min-h-100 md:min-h-130 lg:min-h-150">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "22px 22px" }} />
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <button className="w-11 h-11 rounded-2xl glass border border-white/40 dark:border-white/10 shadow-soft flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all duration-300">
                <Heart className="w-5 h-5" strokeWidth={2} />
              </button>
              <button className="w-11 h-11 rounded-2xl glass border border-white/40 dark:border-white/10 shadow-soft flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300">
                <Share2 className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="relative aspect-square w-full max-w-md animate-float">
              <div className="absolute -inset-6  rounded-[3rem] opacity-[0.07]" />
              <div className="relative w-full h-full">
                <Image
                  className=" md:p-8 drop-shadow-soft-xl rounded-4xl"
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  // sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <CardContent className="lg:col-span-3 p-6 md:p-10 lg:p-12 grid gap-5 md:gap-6 content-start">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="grid gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/70 border-0">
                    {product.brand}
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-bold px-3 py-1.5 rounded-full border-0">
                    {product.category}
                  </Badge>
                  {product.stock > 0 && product.stock <= 5 && (
                    <Badge variant="destructive" className="text-xs font-bold px-3 py-1.5 rounded-full animate-pulse-subtle">
                      فقط {product.stock.toLocaleString("fa-IR")} عدد باقیمانده!
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>
              <div className="flex items-center gap-1.5 p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4.5 h-4.5 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-amber-400/30"}`}
                    strokeWidth={0}
                  />
                ))}
                <span className="text-xs font-black text-amber-700 dark:text-amber-300 mr-1">۴.۰</span>
                <span className="text-[11px] text-muted-foreground">(۱۲۸ نظر)</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-8 text-sm md:text-base">
              {product.description}
            </p>

            <div className="h-px w-full bg-linear-to-l from-transparent via-border to-transparent" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground font-bold mb-2">وضعیت موجودی</p>
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400 text-sm md:text-base">
                      موجود در انبار ({product.stock.toLocaleString("fa-IR")} عدد)
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2 font-bold text-destructive">
                    <Package className="w-4.5 h-4.5" strokeWidth={2} />
                    متاسفانه این کالا در حال حاضر ناموجود است
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-3xl p-6 md:p-8 bg-linear-to-br from-accent/60 via-background to-accent/30 border border-border/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full gradient-primary blur-3xl opacity-10 pointer-events-none" />
              <div className="relative flex flex-wrap items-end justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-bold">قیمت نهایی</p>
                  <div className="flex items-baseline gap-2 md:gap-3">
                    <span className="text-3xl md:text-5xl font-black gradient-text tabular-nums tracking-tight">
                      {Number(product.price).toLocaleString("fa-IR")}
                    </span>
                    <span className="text-sm md:text-base text-muted-foreground font-bold">تومان</span>
                  </div>
                </div>
                {product.stock > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <AddToCart productId={product.id} stock={product.stock} initialQuantity={cartQuantity} />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-3 md:p-4 rounded-2xl border border-border/50 bg-card/50 hover:bg-accent/40 hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm mb-0.5">{feature.title}</p>
                    <p className="text-[11px] md:text-xs text-muted-foreground leading-snug">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>

      {relatedProducts.length > 0 && (
        <ProductList data={relatedProducts} title="محصولات مرتبط" limit={4} />
      )}
    </div>
  );
}
