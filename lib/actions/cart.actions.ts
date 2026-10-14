'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { cartItemSchema } from '@/lib/validators'
import type { cart, CartItem } from '@/types'
import { revalidatePath, revalidateTag } from 'next/cache'
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

function revalidateCartPages() {
  try {
    // revalidateTag('cart')
  } catch (_) {
    // ignore if tag isn't set yet
  }
  revalidatePath('/cart')
  revalidatePath('/', 'layout')
  revalidatePath('/product', 'layout')
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
    brand: item.product.brand ?? undefined,
    name: item.product.name,
    slug: item.product.slug,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity,
    stock: item.product.stock,
  }))

  return convertToPlainObject(calcCart(items))
}

export async function addItemToCart(productId: string, quantity: number = 1) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return {
        success: false,
        message: 'برای افزودن به سبد خرید، لطفاً ابتدا وارد حساب کاربری شوید.',
        redirectTo: '/sign-in',
      }
    }

    const parsed = cartItemSchema.safeParse({
      productId,
      quantity: Number(quantity) || 1,
    })

    if (!parsed.success) {
      const issues = parsed.error.issues.map(i => i.message).join('، ')
      return {
        success: false,
        message: `اطلاعات معتبر نیست: ${issues}`,
      }
    }

    const { productId: validProductId, quantity: validQuantity } = parsed.data

    const product = await prisma.product.findUnique({
      where: { id: validProductId },
    })

    if (!product) {
      return { success: false, message: 'محصول در پایگاه داده یافت نشد.' }
    }

    if (product.stock < 1) {
      return { success: false, message: 'متاسفانه این محصول در حال حاضر موجود نمی‌باشد.' }
    }

    const userCart = await getOrCreateCart(session.user.id)

    const existingItem = await prisma.cartItems.findFirst({
      where: { cartId: userCart.id, productId: validProductId },
    })

    const newQuantity = existingItem
      ? existingItem.quantity + validQuantity
      : validQuantity

    if (newQuantity > product.stock) {
      return {
        success: false,
        message: `حداکثر ${product.stock.toLocaleString('fa-IR')} عدد از این محصول در انبار موجود است (شما ${existingItem ? existingItem.quantity.toLocaleString('fa-IR') + ' عدد در سبد دارید و ' : ''}می‌خواهید ${validQuantity.toLocaleString('fa-IR')} عدد بیشتر اضافه کنید).`,
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
          productId: validProductId,
          quantity: validQuantity,
        },
      })
    }

    revalidateCartPages()

    return {
      success: true,
      message: existingItem
        ? `تعداد محصول در سبد خرید به ${newQuantity.toLocaleString('fa-IR')} عدد افزایش یافت.`
        : `${product.name} با موفقیت به سبد خرید اضافه شد.`,
    }
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.error('[CART] addItemToCart error:', e)
    const errorMessage = e instanceof Error ? e.message : ''
    return {
      success: false,
      message: errorMessage && errorMessage.length < 120
        ? `خطا: ${errorMessage}`
        : 'خطایی هنگام افزودن محصول به سبد خرید رخ داد. لطفاً دوباره تلاش کنید.',
    }
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

    const deleted = await prisma.cartItems.deleteMany({
      where: { cartId: userCart.id, productId },
    })

    if (deleted.count === 0) {
      return { success: false, message: 'محصولی برای حذف یافت نشد.' }
    }

    revalidateCartPages()

    return { success: true, message: 'محصول با موفقیت از سبد خرید حذف شد.' }
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.error('[CART] removeItemFromCart error:', e)
    const errorMessage = e instanceof Error ? e.message : ''
    return {
      success: false,
      message: errorMessage && errorMessage.length < 120
        ? `خطا: ${errorMessage}`
        : 'خطایی هنگام حذف محصول رخ داد. لطفاً دوباره تلاش کنید.',
    }
  }
}

export async function updateItemQuantity(productId: string, quantity: number) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, message: 'لطفاً ابتدا وارد حساب کاربری شوید.' }
    }

    const parsed = cartItemSchema.safeParse({
      productId,
      quantity: Number(quantity) || 1,
    })

    if (!parsed.success) {
      const issues = parsed.error.issues.map(i => i.message).join('، ')
      return {
        success: false,
        message: `اطلاعات معتبر نیست: ${issues}`,
      }
    }

    const { productId: validProductId, quantity: validQuantity } = parsed.data

    const product = await prisma.product.findUnique({
      where: { id: validProductId },
    })

    if (!product) {
      return { success: false, message: 'محصول یافت نشد.' }
    }

    if (validQuantity > product.stock) {
      return {
        success: false,
        message: `حداکثر ${product.stock.toLocaleString('fa-IR')} عدد از این محصول موجود است.`,
      }
    }

    if (validQuantity < 1) {
      return { success: false, message: 'تعداد حداقل باید ۱ عدد باشد.' }
    }

    const userCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!userCart) {
      return { success: false, message: 'سبد خرید یافت نشد.' }
    }

    const updated = await prisma.cartItems.updateMany({
      where: { cartId: userCart.id, productId: validProductId },
      data: { quantity: validQuantity },
    })

    if (updated.count === 0) {
      return { success: false, message: 'محصول در سبد خرید شما یافت نشد.' }
    }

    revalidateCartPages()

    return { success: true, message: `تعداد محصول به ${validQuantity.toLocaleString('fa-IR')} عدد تغییر یافت.` }
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.error('[CART] updateItemQuantity error:', e)
    const errorMessage = e instanceof Error ? e.message : ''
    return {
      success: false,
      message: errorMessage && errorMessage.length < 120
        ? `خطا: ${errorMessage}`
        : 'خطایی هنگام به‌روزرسانی تعداد رخ داد. لطفاً دوباره تلاش کنید.',
    }
  }
}
