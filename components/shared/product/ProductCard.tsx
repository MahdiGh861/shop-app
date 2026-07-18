import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/types";
function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <Card className="w-full max-w-sm pt-0 shadow shadow-gray-100 transition-colors hover:-translate-y-1.5">
        <CardHeader className="p-0 items-center">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              height={300}
              width={300}
              priority={true}
            />
          </Link>
        </CardHeader>
        <CardContent className="p-4 grid gap-4">
            <div className="text-xs">{product.brand}</div>
            <Link href={`/product/${product.slug}`} className="text-sm font-medium">
            {product.name}
            </Link>
            <div className="flex justify-between items-center gap-4">
                {product.stock > 0 ? (
                  <p className="font-bold">{product.price}</p>
                ):(
                  <p>ناموجود</p>
                )}
            </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ProductCard;
