'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== 'admin') {
    throw new Error('دسترسی غیرمجاز')
  }
  return session
}

export async function getAllUsers() {
  try {
    await requireAdmin()

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return { success: true, data: JSON.parse(JSON.stringify(users)) }
  } catch (error) {
    return { success: false, message: 'خطا در دریافت لیست کاربران.' }
  }
}

export async function deleteUser(userId: string) {
  try {
    const session = await requireAdmin()

    if (session.user.id === userId) {
      return { success: false, message: 'شما نمی‌توانید حساب خود را حذف کنید.' }
    }

    await prisma.user.delete({ where: { id: userId } })

    revalidatePath('/admin/users')

    return { success: true, message: 'کاربر با موفقیت حذف شد.' }
  } catch (error) {
    return { success: false, message: 'خطا در حذف کاربر.' }
  }
}
