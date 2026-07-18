"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { signInWithCrendentials } from "@/lib/actions/user.action";
import { useSearchParams } from "next/navigation";
function SigninForm() {
  const [data,action] = useActionState(signInWithCrendentials,{
    success :false,
    message:  ''
  })
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  return (
    <>
    <form action={action}>
      <input type="hidden" value={callbackUrl}/>
      <div className="space-y-6">
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
            <Button className="w-full cursor-pointer" type="submit" variant="default">ورود</Button>
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-blue-600">
            <Link href="/sign-up">ثبت نام</Link>
        </div>
      </div>
      </form>
    </>
  );
}

export default SigninForm;
