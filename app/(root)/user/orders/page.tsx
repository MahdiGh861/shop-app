import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBagIcon } from "lucide-react"

export default async function UserOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">سفارشات</h1>
        <p className="text-muted-foreground">تاریخچه سفارشات شما</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>سفارشات اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBagIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">هنوز سفارشی ثبت نکرده‌اید</h3>
            <p className="text-muted-foreground max-w-md">
              پس از ثبت سفارش، تاریخچه سفارشات شما در اینجا نمایش داده خواهد شد.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
