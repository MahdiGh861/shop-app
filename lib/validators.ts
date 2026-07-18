import { z } from "zod";

export const insertProductSchema = z.object({
    name : z.string(),
    slug : z.string(),
    category : z.string(),
    brand : z.string(),
    description : z.string(),
    image : z.string(),
    stock : z.number(),
    price : z.number(),
});

export const cartItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().min(1),
});

export const signInFromSchema = z.object({
    email : z.string().email('ایمیل اشتباه است!'),
    password : z.string().min(5,'رمز عبور حداقل 5 کاراکتر باشد.'),

})

export const signUpFromSchema = z.object({
    name : z.string().min(1, 'نام الزامی است.'),
    email : z.string().email('ایمیل اشتباه است!'),
    password : z.string().min(5,'رمز عبور حداقل 5 کاراکتر باشد.'),
    confirmPassword : z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن مطابقت ندارند.',
    path: ['confirmPassword'],
})

export const updateProfileSchema = z.object({
    name: z.string().min(1, 'نام الزامی است.'),
    email: z.string().email('ایمیل اشتباه است!'),
    image: z.string().optional(),
})

export const updateAddressSchema = z.object({
    fullName: z.string().min(1, 'نام کامل الزامی است.'),
    street: z.string().min(1, 'آدرس الزامی است.'),
    city: z.string().min(1, 'شهر الزامی است.'),
    postalCode: z.string().min(1, 'کد پستی الزامی است.'),
    country: z.string().min(1, 'کشور الزامی است.'),
    phone: z.string().min(1, 'شماره تلفن الزامی است.'),
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(5, 'رمز عبور فعلی حداقل 5 کاراکتر باشد.'),
    newPassword: z.string().min(5, 'رمز عبور جدید حداقل 5 کاراکتر باشد.'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'رمز عبور جدید و تکرار آن مطابقت ندارند.',
    path: ['confirmPassword'],
})
