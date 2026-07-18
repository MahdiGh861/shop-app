import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import UserAddressForm from "@/components/shared/user/UserAddressForm"

export default async function UserAddressesPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/sign-in?callback=/user/addresses")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      address: true,
    },
  })

  if (!user) {
    redirect("/sign-in?callback=/user/addresses")
  }

  const address = user.address as Record<string, string> | null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">آدرس‌ها</h1>
        <p className="text-muted-foreground">آدرس ارسال خود را مدیریت کنید</p>
      </div>

      <UserAddressForm address={address} />
    </div>
  )
}
