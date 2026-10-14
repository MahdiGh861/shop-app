import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SigninForm from "./SigninForm";

async function SignIn() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="w-full">
      <SigninForm />
    </div>
  );
}

export default SignIn;
