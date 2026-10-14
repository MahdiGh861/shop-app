import ProductList from "@/components/shared/product/productList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getLatestProducts } from "@/lib/actions/product.actions";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Truck,
  Shield,
  Headphones,
  Star,
  Zap,
  ChevronLeft,
} from "lucide-react";

export default async function Home() {
  const latestProducts = await getLatestProducts(8);

  const features = [
    {
      icon: Truck,
      title: "ارسال رایگان",
      desc: "برای خرید‌های بالای ۵۰۰ هزار تومان",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Shield,
      title: "ضمانت اصالت",
      desc: "تمامی محصولات با ضمانت اصالت کالا",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Headphones,
      title: "پشتیبانی ۲۴ ساعته",
      desc: "همراه شما در هر ساعت از شبانه‌روز",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "تحویل فوری",
      desc: "ارسال سریع در تهران و شهرهای بزرگ",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-6 md:pt-10 pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl md:rounded-[2rem] p-5 md:p-12 lg:p-16 mb-16 md:mb-20 bg-linear-to-br from-violet-50 via-indigo-50/40 to-fuchsia-50 dark:from-indigo-950/40 dark:via-violet-950/20 dark:to-fuchsia-950/30 border border-border/50 shadow-soft-xl">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full" />
          <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-600/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-3 space-y-6 md:space-y-8 animate-fade-in-up">
              <Badge className="text-xs md:text-sm font-bold py-2 px-4 rounded-full bg-white/70 dark:bg-white/10 border-primary/30 text-primary backdrop-blur-sm shadow-soft inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                <span>جدیدترین نسخه فروشگاه</span>
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                تجربه خریدی
                <br />
                <span className="gradient-text">مدرن و لذت‌بخش</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                جدیدترین و بهترین محصولات الکترونیکی را با بهترین قیمت و کیفیت
                تضمین‌شده از ما خریداری کنید. ارسال سریع، پشتیبانی عالی و
                تجربه‌ای متفاوت.
              </p>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2">
                <Link href="/product" className="group">
                  <Button
                    size="lg"
                    className="h-12 md:h-14 px-7 md:px-10 text-base md:text-lg font-bold rounded-2xl gradient-primary text-white shadow-soft-xl hover:shadow-glow border-0 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                  >
                    <ShoppingBag
                      className="w-5 h-5 md:w-6 md:h-6 ml-2"
                      strokeWidth={2.2}
                    />
                    مشاهده محصولات
                    <ChevronLeft
                      className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
                      strokeWidth={2.5}
                    />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 md:h-14 px-7 md:px-10 text-base md:text-lg font-bold rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300"
                  >
                    بیشتر بدانید
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <div className="text-sm md:text-base">
                  <span className="font-bold text-foreground">۴.۹ از ۵</span>
                  <span className="text-muted-foreground mr-1.5">
                    برای بیش از ۱۰,۰۰۰ خرید
                  </span>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-2 relative animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 gradient-primary rounded-[2.5rem] opacity-10 rotate-6 animate-float" />
                <div
                  className="absolute inset-0 bg-linear-to-br from-violet-400/20 to-fuchsia-400/20 rounded-[2.5rem] -rotate-3 animate-float"
                  style={{ animationDelay: "0.5s" }}
                />
                <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-soft-xl border border-white/40 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-xl">
                  <Image
                    src="/images/mobile/01.png"
                    alt="بنر فروشگاه - محصولات ویژه"
                    className="w-full h-full object-cover"
                    width={600}
                    height={600}
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 glass shadow-soft-xl rounded-2xl p-3 md:p-4 border border-white/50 dark:border-white/10 animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <Sparkles
                        className="w-5 h-5 md:w-6 md:h-6 text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div>
                      <p className="font-black text-sm md:text-base">
                        پیشنهاد ویژه
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        تا ۴۰٪ تخفیف ویژه
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          id="features"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-20"
        >
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-5 md:p-6 bg-card border border-border/60 hover:border-primary/30 transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div
                className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
              />
              <div
                className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center shadow-soft mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}
              >
                <feature.icon
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <ProductList data={latestProducts} title="جدیدترین محصولات" limit={8} />

      {/* CTA Section */}
      <section className="my-14 md:my-20">
        <div className="relative overflow-hidden rounded-3xl md:rounded-[2rem] p-8 md:p-14 text-center bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-soft-xl">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/20 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-fuchsia-300/30 rounded-full blur-3xl translate-y-1/2" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">
              محصولات منتخب با تخفیف ویژه
            </h2>
            <p className="text-white/80 text-base md:text-lg">
              فرصت طلایی را از دست ندهید. بهترین‌ها را با کمترین قیمت خریداری
              کنید.
            </p>
            <Link href="/product">
              <Button
                size="lg"
                className="h-12 md:h-14 px-8 md:px-12 text-base md:text-lg font-bold rounded-2xl bg-white text-white hover:bg-white/95 shadow-soft-xl hover:shadow-glow hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                مشاهده همه محصولات
                <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
