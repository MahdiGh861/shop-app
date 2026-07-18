import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import AddToCart from "@/components/shared/product/addToCart";

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-10 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className=" p-0 flex items-center justify-center">
          <Image
            className="rounded-md"
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            priority
          />
        </div>
        <CardContent className="p-0 grid gap-6">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-sm">
            دسته‌بندی: <span className="font-medium">{product.category}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">{product.price} تومان</span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-600">
                موجود ({product.stock} عدد)
              </span>
            ) : (
              <span className="text-sm text-red-500">ناموجود</span>
            )}
          </div>
          {product.stock > 0 && (
            <div className="flex items-center">
              <AddToCart productId={product.id} stock={product.stock} />
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}
