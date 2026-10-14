"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActionState } from "react";
import { signUpUser } from "@/lib/actions/user.action";
import { User, Mail, Lock, UserPlus, ShieldCheck } from "lucide-react";

function SignupForm() {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: ""
  });

  return (
    <Card className="w-full max-w-md overflow-hidden border-border/60 shadow-soft-xl animate-fade-in-up m-auto">
      <div className="relative px-6 md:px-10 pt-10 md:pt-12 pb-6 md:pb-8 text-center bg-linear-to-br from-accent/70 via-transparent to-transparent border-b border-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 gradient-primary rounded-b-full" />
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-3xl gradient-primary mb-5 shadow-soft-xl relative">
          <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.2} />
        </div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
          ایجاد حساب کاربری
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xs mx-auto leading-relaxed">
          همین حالا عضو خانواده فروشگاه شوید
        </p>
      </div>

      <CardContent className="px-6 md:px-10 py-7 md:py-8">
        <form action={action} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-sm font-bold mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" strokeWidth={2.2} />
              نام و نام خانوادگی
            </Label>
            <div className="relative group">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="نام کامل خود را وارد کنید"
                required
                autoComplete="name"
                className="h-12 pl-12 pr-4 rounded-2xl text-base group-focus-within:shadow-soft transition-all duration-300"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300 pointer-events-none">
                <User className="w-4.5 h-4.5" strokeWidth={2} />
              </span>
            </div>
          </div>

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
                placeholder="حداقل ۶ کاراکتر"
                required
                autoComplete="new-password"
                className="h-12 pl-12 pr-4 rounded-2xl text-base group-focus-within:shadow-soft transition-all duration-300"
                dir="ltr"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300 pointer-events-none">
                <Lock className="w-4.5 h-4.5" strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="confirmPassword" className="text-sm font-bold mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" strokeWidth={2.2} />
              تکرار رمز عبور
            </Label>
            <div className="relative group">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="رمز عبور را دوباره وارد کنید"
                required
                autoComplete="new-password"
                className="h-12 pl-12 pr-4 rounded-2xl text-base group-focus-within:shadow-soft transition-all duration-300"
                dir="ltr"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300 pointer-events-none">
                <Lock className="w-4.5 h-4.5" strokeWidth={2} />
              </span>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group pt-1">
            <input type="checkbox" required className="w-4.5 h-4.5 mt-0.5 rounded-md border-border accent-primary cursor-pointer shrink-0" />
            <span className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium group-hover:text-foreground transition-colors duration-300">
              <span className="font-bold text-foreground">شرایط و قوانین</span> و
              <span className="font-bold text-primary mx-1">حریم خصوصی</span>
              را می‌پذیرم.
            </span>
          </label>

          <div className="pt-2">
            <Button
              className="w-full h-13 md:h-14 text-base md:text-lg font-black rounded-2xl"
              type="submit"
              variant="default"
              size="lg"
            >
              <UserPlus className="w-5 h-5 ml-2" strokeWidth={2.2} />
              <span>ایجاد حساب کاربری</span>
            </Button>
          </div>

          {data && !data.success && data.message && (
            <div className="animate-fade-in-up bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-4 text-sm font-medium text-center">
              {data.message}
            </div>
          )}

          {data && data.success && (
            <div className="animate-fade-in-up bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl p-4 text-sm font-medium text-center">
              {data.message}
            </div>
          )}

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-linear-to-br from-indigo-500/10 to-violet-500/5 border border-indigo-500/10">
            <ShieldCheck className="w-10 h-10 text-indigo-500 shrink-0" strokeWidth={2} />
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              اطلاعات شما با بالاترین سطح امنیت محفوظ می‌ماند و هیچگاه در اختیار اشخاص ثالث قرار نمی‌گیرد.
            </p>
          </div>

          <div className="text-center pt-2 pb-1">
            <p className="text-sm md:text-base text-muted-foreground">
              قبلاً عضو شده‌اید؟
              <Link href="/sign-in" className="mr-2 font-black text-primary hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all duration-300 inline-flex items-center gap-1">
                وارد حساب خود شوید
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
