import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import CheckoutForm from "@/components/shared/checkout/CheckoutForm"
import type { Address } from "@/types"

export default async function CheckoutPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/sign-in?callback=/checkout")
  }

  const [cartData, userData] = await Promise.all([
    prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { address: true },
    }),
  ])

  if (!cartData || cartData.items.length === 0) {
    redirect("/cart")
  }

  const cart = {
    items: cartData.items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
      stock: item.product.stock,
    })),
    itemsPrice: cartData.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ),
    totalPrice: cartData.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ),
  }

  const address = (userData?.address as Record<string, string>) as Address | null

  return (
    <div className="max-w-7xl mx-auto px-10 py-8">
      <h1 className="text-2xl font-bold mb-6">تکمیل خرید</h1>
      <CheckoutForm cart={cart} address={address} />
    </div>
  )
}
