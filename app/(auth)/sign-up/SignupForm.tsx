"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { signUpUser } from "@/lib/actions/user.action";

function SignupForm() {
  const router = useRouter();
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  if (data.success) {
    router.push("/sign-in");
  }

  return (
    <>
      <form action={action}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="mb-2">
              نام
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2">
              ایمیل
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2">
              رمز عبور
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="mb-2">
              تکرار رمز عبور
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <Button
              className="w-full cursor-pointer"
              type="submit"
              variant="default"
            >
              ثبت نام
            </Button>
          </div>
          {data && !data.success && (
            <div className="text-center text-destructive">{data.message}</div>
          )}
          <div className="text-sm text-center text-blue-600">
            <Link href="/sign-in">ورود به حساب کاربری</Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
