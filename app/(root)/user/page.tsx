import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserIcon, ShoppingBagIcon, MapPinIcon, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function UserDashboardPage() {
  const session = await auth()
  
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      name: true,
      email: true,
      role: true,
      createdAt: true,
      address: true,
    },
  })

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("fa-IR")
    : "-"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">داشبورد</h1>
        <p className="text-muted-foreground">
          خوش آمدید، {user?.name || "کاربر"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">نام کاربری</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.name || "-"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تاریخ عضویت</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{joinDate}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">نقش</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.role === "admin" ? "مدیر" : "کاربر"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">آدرس ثبت شده</CardTitle>
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.address ? "دارد" : "ندارد"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>دسترسی سریع</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              render={<Link href="/user/profile" />}
              variant="outline"
              className="w-full justify-start gap-2"
              nativeButton={false}
            >
              <UserIcon className="h-4 w-4" />
              ویرایش پروفایل
            </Button>
            <Button
              render={<Link href="/user/addresses" />}
              variant="outline"
              className="w-full justify-start gap-2"
              nativeButton={false}
            >
              <MapPinIcon className="h-4 w-4" />
              مدیریت آدرس‌ها
            </Button>
            <Button
              render={<Link href="/user/orders" />}
              variant="outline"
              className="w-full justify-start gap-2"
              nativeButton={false}
            >
              <ShoppingBagIcon className="h-4 w-4" />
              مشاهده سفارشات
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات حساب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ایمیل:</span>
              <span>{user?.email || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">نقش:</span>
              <span>{user?.role === "admin" ? "مدیر" : "کاربر"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">تاریخ عضویت:</span>
              <span>{joinDate}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
