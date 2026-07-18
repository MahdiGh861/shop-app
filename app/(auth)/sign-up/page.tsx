import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import SignupForm from "./SignupForm";

async function SignUp() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-72 max-w-2xl m-auto">
        <CardHeader className="space-y-4">
          <Link href="/" className="text-center">
            بازگشت به فروشگاه
          </Link>
          <CardTitle className="text-center">ثبت نام</CardTitle>
          <CardDescription className="text-center">
            ایجاد حساب کاربری جدید
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
