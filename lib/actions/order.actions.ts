'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { shippingAddressSchema } from '@/lib/validators'
import type { Address } from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { convertToPlainObject } from '../utils'

export async function createOrder(prevState: unknown, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, message: 'لطفاً ابتدا وارد حساب کاربری شوید.' }
    }

    const shippingAddress = shippingAddressSchema.parse({
      fullName: formData.get('fullName'),
      street: formData.get('street'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
      country: formData.get('country'),
      phone: formData.get('phone'),
    })

    const paymentMethod = formData.get('paymentMethod') as string

    const cartData = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    if (!cartData || cartData.items.length === 0) {
      return { success: false, message: 'سبد خرید شما خالی است.' }
    }

    for (const item of cartData.items) {
      if (item.quantity > item.product.stock) {
        return {
          success: false,
          message: `موجودی محصول "${item.product.name}" کافی نیست.`,
        }
      }
    }

    const itemsPrice = cartData.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        shippingAddress: shippingAddress as unknown as Record<string, string>,
        itemsPrice,
        totalPrice: itemsPrice,
        paymentMethod: paymentMethod || 'پرداخت درب منزل',
        items: {
          create: cartData.items.map((item) => ({
            productId: item.productId,
            name: item.product.name,
            slug: item.product.slug,
            image: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    for (const item of cartData.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    }

    await prisma.cartItems.deleteMany({
      where: { cartId: cartData.id },
    })

    revalidatePath('/cart')
    revalidatePath('/user/orders')

    redirect(`/order/${order.id}`)
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error
    }
    return { success: false, message: 'خطا در ثبت سفارش.' }
  }
}

export async function getOrderById(orderId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  })

  if (!order || order.userId !== session.user.id) {
    redirect('/user/orders')
  }

  return convertToPlainObject({
    ...order,
    shippingAddress: order.shippingAddress as unknown as Address,
  })
}

export async function getUserOrders() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return orders.map((order) =>
    convertToPlainObject({
      ...order,
      shippingAddress: order.shippingAddress as unknown as Address,
    })
  )
}
