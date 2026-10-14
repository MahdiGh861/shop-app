import { insertProductSchema } from "@/lib/validators";
import {z} from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
    id : string,
    createdAt : Date,
};

export type CartItem = {
    brand?: string;
    productId: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    quantity: number;
    stock: number;
};

export type cart = {
    items: CartItem[];
    itemsPrice: number;
    totalPrice: number;
};

export type Address = {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
};

export type OrderItem = {
    id: string;
    productId: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    quantity: number;
};

export type Order = {
    id: string;
    userId: string;
    shippingAddress: Address;
    itemsPrice: number;
    totalPrice: number;
    paymentMethod: string;
    status: string;
    createdAt: Date;
    items: OrderItem[];
};