import { getUserOrders } from "@/lib/actions/order.actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBagIcon } from "lucide-react"
import Link from "next/link"

export default async function UserOrdersPage() {
  const orders = await getUserOrders()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">سفارشات</h1>
        <p className="text-muted-foreground">تاریخچه سفارشات شما</p>
      </div>

      {orders.length === 0 ? (
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
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  سفارش #{order.id.slice(-8).toUpperCase()}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">تعداد اقلام:</span>
                  <span>{order.items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">روش پرداخت:</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">وضعیت:</span>
                  <span>{order.status}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>مجموع</span>
                  <span>{order.totalPrice.toLocaleString("fa-IR")} تومان</span>
                </div>
                <Link href={`/order/${order.id}`} className="block w-full">
                  <Button variant="outline" size="sm" className="w-full">مشاهده جزئیات</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
