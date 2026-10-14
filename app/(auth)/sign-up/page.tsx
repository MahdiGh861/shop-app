import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignupForm from "./SignupForm";

async function SignUp() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="w-full">
      <SignupForm />
    </div>
  );
}

export default SignUp;
