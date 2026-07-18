import { auth } from "@/auth"
import { redirect } from "next/navigation"
import UserSidebar from "@/components/shared/user/UserSidebar"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/sign-in?callback=/user")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-bold mb-4 px-4">حساب کاربری</h2>
            <UserSidebar role={session.user.role} />
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
