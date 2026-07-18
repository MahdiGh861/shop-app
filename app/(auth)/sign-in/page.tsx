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
import SigninForm from "./SigninForm";
async function SignIn(props: { searchParams: Promise<{ callback: string }> }) {
  const session = await auth();
  const { callback } = await props.searchParams;
  if (session) {
    return redirect(callback || "/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-72 max-w-2xl m-auto">
        <CardHeader className="space-y-4">
          <Link href="/" className="text-center">
            بازگشت به فروشگاه
          </Link>
          <CardTitle className="text-center">ورود</CardTitle>
          <CardDescription className="text-center">
            ورود به حساب کاربری
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SigninForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;
