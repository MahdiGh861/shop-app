import { insertProductSchema } from "@/lib/validators";
import {z} from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
    id : string,
    createdAt : Date,
};

export type CartItem = {
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