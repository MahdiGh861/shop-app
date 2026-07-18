import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChangePasswordForm from "@/components/shared/user/ChangePasswordForm"

export default async function UserSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تنظیمات</h1>
        <p className="text-muted-foreground">تنظیمات حساب کاربری خود را مدیریت کنید</p>
      </div>

      <ChangePasswordForm />

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات حساب</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            برای حذف حساب کاربری خود، لطفاً با پشتیبانی تماس بگیرید.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
