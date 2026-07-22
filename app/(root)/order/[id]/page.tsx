import { getOrderById } from "@/lib/actions/order.actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await getOrderById(id)

  return (
    <div className="max-w-3xl mx-auto px-10 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary">سفارش شما ثبت شد!</h1>
        <p className="text-muted-foreground">
          سفارش شما با شماره <span className="font-bold">#{order.id.slice(-8).toUpperCase()}</span> با موفقیت ثبت شد.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جزئیات سفارش</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">شماره سفارش:</span>
            <span className="font-bold">#{order.id.slice(-8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">تاریخ ثبت:</span>
            <span>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">وضعیت:</span>
            <span>{order.status}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">روش پرداخت:</span>
            <span>{order.paymentMethod}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>آدرس ارسال</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
          <p>{order.shippingAddress.country}</p>
          <p>تلفن: {order.shippingAddress.phone}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>اقلام سفارش</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-md"
              />
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="text-sm font-medium hover:underline">
                  {item.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {item.quantity} × {item.price.toLocaleString("fa-IR")} تومان
                </p>
              </div>
              <p className="text-sm font-bold whitespace-nowrap">
                {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
              </p>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>مجموع</span>
            <span>{order.totalPrice.toLocaleString("fa-IR")} تومان</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Link href="/user/orders">
          <Button variant="outline">مشاهده همه سفارشات</Button>
        </Link>
        <Link href="/">
          <Button>ادامه خرید</Button>
        </Link>
      </div>
    </div>
  )
}
