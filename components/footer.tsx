import {  Heart, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/60 mt-20">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight gradient-text">فروشگاه</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              بهترین محصولات با کیفیت بالا، قیمت منصفانه و تجربه خریدی متفاوت. ارسال سریع و پشتیبانی ۲۴ ساعته.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wide uppercase text-foreground/90">دسترسی سریع</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "صفحه اصلی" },
                { href: "/product", label: "محصولات" },
                { href: "/cart", label: "سبد خرید" },
                { href: "/sign-in", label: "ورود / ثبت نام" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40 group-hover:bg-primary group-hover:w-2 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wide uppercase text-foreground/90">خدمات مشتریان</h3>
            <ul className="space-y-2.5">
              {["سوالات متداول", "رویه بازگرداندن کالا", "شرایط استفاده", "حریم خصوصی", "راهنمای خرید"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40 group-hover:bg-primary group-hover:w-2 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wide uppercase text-foreground/90">تماس با ما</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={2} />
                <span className="text-sm text-muted-foreground">تهران، خیابان ولیعصر، پلاک ۱۲۳۴</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
                <span className="text-sm text-muted-foreground" dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
                <span className="text-sm text-muted-foreground" dir="ltr">support@shop.ir</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-linear-to-l from-transparent via-border to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            تمام حقوق برای فروشگاه محفوظ است &copy; {currentYear}
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/80">
              ساخته شده با
              <Heart className="w-3.5 h-3.5 text-destructive fill-destructive animate-pulse-subtle" />
            </span>
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/80">
            <span>✓ پرداخت امن</span>
            <span>✓ ارسال سریع</span>
            <span>✓ ۷ روز ضمانت</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
