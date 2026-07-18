import { Product } from "@/types";
import ProductCard from "./ProductCard";


function ProductList({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      {data.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {limitedData.map((item: Product) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      ) : (
        <h2>محصولی یافت نشد !</h2>
      )}
    </div>
  );
}

export default ProductList;
