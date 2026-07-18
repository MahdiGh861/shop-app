'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { cartItemSchema } from '@/lib/validators'
import type { cart, CartItem } from '@/types'
import { revalidatePath } from 'next/cache'
import { convertToPlainObject } from '../utils'

function calcCart(items: CartItem[]): cart {
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  return {
    items,
    itemsPrice,
    totalPrice: itemsPrice,
  }
}

async function getOrCreateCart(userId: string) {
  const existingCart = await prisma.cart.findUnique({
    where: { userId },
  })

  if (existingCart) return existingCart

  return prisma.cart.create({
    data: { userId },
  })
}

export async function getCart(): Promise<cart> {
  const session = await auth()
  if (!session?.user?.id) {
    return { items: [], itemsPrice: 0, totalPrice: 0 }
  }

  const cartData = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
  })

  if (!cartData) {
    return { items: [], itemsPrice: 0, totalPrice: 0 }
  }

  const items: CartItem[] = cartData.items.map((item) => ({
    productId: item.productId,
    name: item.product.name,
    slug: item.product.slug,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity,
    stock: item.product.stock,
  }))

  return convertToPlainObject(calcCart(items))
}

export async function addItemToCart(prevState: unknown, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, message: 'لطفاً ابتدا وارد حساب کاربری شوید.' }
    }

    const { productId, quantity } = cartItemSchema.parse({
      productId: formData.get('productId'),
      quantity: Number(formData.get('quantity')) || 1,
    })

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return { success: false, message: 'محصول یافت نشد.' }
    }

    if (product.stock < 1) {
      return { success: false, message: 'این محصول موجود نیست.' }
    }

    const userCart = await getOrCreateCart(session.user.id)

    const existingItem = await prisma.cartItems.findFirst({
      where: { cartId: userCart.id, productId },
    })

    const newQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity

    if (newQuantity > product.stock) {
      return {
        success: false,
        message: `حداکثر ${product.stock} عدد از این محصول موجود است.`,
      }
    }

    if (existingItem) {
      await prisma.cartItems.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      })
    } else {
      await prisma.cartItems.create({
        data: {
          cartId: userCart.id,
          productId,
          quantity,
        },
      })
    }

    revalidatePath('/cart')

    return { success: true, message: 'محصول به سبد خرید اضافه شد.' }
  } catch {
    return { success: false, message: 'خطا در افزودن به سبد خرید.' }
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, message: 'لطفاً ابتدا وارد حساب کاربری شوید.' }
    }

    const userCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!userCart) {
      return { success: false, message: 'سبد خرید یافت نشد.' }
    }

    await prisma.cartItems.deleteMany({
      where: { cartId: userCart.id, productId },
    })

    revalidatePath('/cart')

    return { success: true, message: 'محصول از سبد خرید حذف شد.' }
  } catch {
    return { success: false, message: 'خطا در حذف محصول.' }
  }
}

export async function updateItemQuantity(productId: string, quantity: number) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, message: 'لطفاً ابتدا وارد حساب کاربری شوید.' }
    }

    const { quantity: validQuantity } = cartItemSchema.parse({
      productId,
      quantity,
    })

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return { success: false, message: 'محصول یافت نشد.' }
    }

    if (validQuantity > product.stock) {
      return {
        success: false,
        message: `حداکثر ${product.stock} عدد از این محصول موجود است.`,
      }
    }

    const userCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!userCart) {
      return { success: false, message: 'سبد خرید یافت نشد.' }
    }

    await prisma.cartItems.updateMany({
      where: { cartId: userCart.id, productId },
      data: { quantity: validQuantity },
    })

    revalidatePath('/cart')

    return { success: true, message: 'تعداد به‌روزرسانی شد.' }
  } catch {
    return { success: false, message: 'خطا در به‌روزرسانی تعداد.' }
  }
}
