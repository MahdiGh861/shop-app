"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActionState } from "react";
import { signInWithCrendentials } from "@/lib/actions/user.action";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, LogIn, Sparkles, ArrowRight } from "lucide-react";

function SigninForm() {
  const [data, action] = useActionState(signInWithCrendentials, {
    success: false,
    message: ""
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <Card className="w-full max-w-md overflow-hidden border-border/60 shadow-soft-xl animate-fade-in-up m-auto">
      <div className="relative px-6 md:px-10 pt-10 md:pt-12 pb-6 md:pb-8 text-center bg-linear-to-br from-accent/70 via-transparent to-transparent border-b border-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 gradient-primary rounded-b-full" />
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-3xl gradient-primary mb-5 shadow-soft-xl">
          <LogIn className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.2} />
        </div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
          خوش آمدید!
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xs mx-auto leading-relaxed">
          برای ادامه وارد حساب کاربری خود شوید
        </p>
      </div>

      <CardContent className="px-6 md:px-10 py-7 md:py-8">
        <form action={action} className="space-y-5">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-bold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" strokeWidth={2.2} />
              ایمیل
            </Label>
            <div className="relative group">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                autoComplete="email"
                className="h-12 pl-12 pr-4 rounded-2xl text-base group-focus-within:shadow-soft transition-all duration-300"
                dir="ltr"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300 pointer-events-none">
                <Mail className="w-4.5 h-4.5" strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="password" className="text-sm font-bold mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" strokeWidth={2.2} />
              رمز عبور
            </Label>
            <div className="relative group">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="h-12 pl-12 pr-4 rounded-2xl text-base group-focus-within:shadow-soft transition-all duration-300"
                dir="ltr"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300 pointer-events-none">
                <Lock className="w-4.5 h-4.5" strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded-md border-border accent-primary cursor-pointer" />
              <span className="text-xs md:text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                مرا به خاطر بسپار
              </span>
            </label>
            <Link href="#" className="text-xs md:text-sm text-primary font-bold hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all duration-300">
              رمز عبور را فراموش کرده‌ام
            </Link>
          </div>

          <div className="pt-2">
            <Button
              className="w-full h-13 md:h-14 text-base md:text-lg font-black rounded-2xl"
              type="submit"
              variant="default"
              size="lg"
            >
              <span>ورود به حساب</span>
              <ArrowRight className="w-5 h-5 mr-2 rtl:rotate-180" strokeWidth={2.5} />
            </Button>
          </div>

          {data && !data.success && (
            <div className="animate-fade-in-up bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-4 text-sm font-medium text-center">
              {data.message}
            </div>
          )}

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center">
              <Badge variant="secondary" className="bg-card px-3 border-border/60 font-medium rounded-full">
                یا
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-2xl border border-border/80 bg-background hover:bg-accent/60 hover:border-border transition-all duration-300 text-sm font-bold">
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 11.5-4.9 11.5-11.7 0-.8-.1-1.4-.2-2.1H12z"/></svg>
              گوگل
            </button>
            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-2xl border border-border/80 bg-background hover:bg-accent/60 hover:border-border transition-all duration-300 text-sm font-bold">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              گیت‌هاب
            </button>
          </div>

          <div className="text-center pt-2 pb-1">
            <p className="text-sm md:text-base text-muted-foreground">
              حساب کاربری ندارید؟
              <Link href="/sign-up" className="mr-2 font-black text-primary hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all duration-300 inline-flex items-center gap-1">
                همین حالا ثبت نام کنید
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SigninForm;
