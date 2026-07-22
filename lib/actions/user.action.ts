'use server'

import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { auth, signIn, signOut } from '@/auth'
import { signInFromSchema, signUpFromSchema, updateProfileSchema, updateAddressSchema, changePasswordSchema } from '../validators'
import { prisma } from "@/lib/prisma";
import { hashSync, compareSync } from 'bcryptjs';
import { getUserOrders } from './order.actions';


export async function signInWithCrendentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFromSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        const callbackUrl = (formData.get('callbackUrl') as string) || '/'

        await signIn('credentials', { ...user, redirectTo: callbackUrl })

        return { success: true, message: 'ورود با موفقیت انجام شد' };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        return { success: false, message: 'ایمیل یا پسورد اشتباه است !' }
    }
}

export async function signOutUser() {
    await signOut()
}

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFromSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        })

        const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
        })

        if (existingUser) {
            return { success: false, message: 'کاربری با این ایمیل قبلا ثبت نام کرده است.' }
        }

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashSync(user.password, 10),
                role: 'user',
            },
        })

        return { success: true, message: 'ثبت نام با موفقیت انجام شد.' }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        }
        return { success: false, message: 'خطا در ثبت نام.' }
    }
}

export async function updateUserProfile(prevState: unknown, formData: FormData) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { success: false, message: 'کاربر وارد نشده است.' }
        }

        const data = updateProfileSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            image: formData.get('image') || undefined,
        })

        const existingUser = await prisma.user.findFirst({
            where: {
                email: data.email,
                NOT: { id: session.user.id }
            }
        })

        if (existingUser) {
            return { success: false, message: 'کاربری با این ایمیل قبلا ثبت نام کرده است.' }
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name: data.name,
                email: data.email,
                image: data.image,
            },
        })

        return { success: true, message: 'پروفایل با موفقیت به‌روزرسانی شد.' }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        }
        return { success: false, message: 'خطا در به‌روزرسانی پروفایل.' }
    }
}

export async function updateUserAddress(prevState: unknown, formData: FormData) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { success: false, message: 'کاربر وارد نشده است.' }
        }

        const data = updateAddressSchema.parse({
            fullName: formData.get('fullName'),
            street: formData.get('street'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
            country: formData.get('country'),
            phone: formData.get('phone'),
        })

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                address: data,
            },
        })

        return { success: true, message: 'آدرس با موفقیت به‌روزرسانی شد.' }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        }
        return { success: false, message: 'خطا در به‌روزرسانی آدرس.' }
    }
}

export async function changeUserPassword(prevState: unknown, formData: FormData) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { success: false, message: 'کاربر وارد نشده است.' }
        }

        const data = changePasswordSchema.parse({
            currentPassword: formData.get('currentPassword'),
            newPassword: formData.get('newPassword'),
            confirmPassword: formData.get('confirmPassword'),
        })

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        })

        if (!user?.password) {
            return { success: false, message: 'کاربر یافت نشد.' }
        }

        const isPasswordValid = compareSync(data.currentPassword, user.password)
        if (!isPasswordValid) {
            return { success: false, message: 'رمز عبور فعلی اشتباه است.' }
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                password: hashSync(data.newPassword, 10),
            },
        })

        return { success: true, message: 'رمز عبور با موفقیت تغییر کرد.' }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message }
        }
        return { success: false, message: 'خطا در تغییر رمز عبور.' }
    }
}
