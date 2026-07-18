import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import UserProfileForm from "@/components/shared/user/UserProfileForm"

export default async function UserProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/sign-in?callback=/user/profile")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
    },
  })

  if (!user) {
    redirect("/sign-in?callback=/user/profile")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">پروفایل</h1>
        <p className="text-muted-foreground">اطلاعات پروفایل خود را ویرایش کنید</p>
      </div>

      <UserProfileForm user={user} />
    </div>
  )
}
