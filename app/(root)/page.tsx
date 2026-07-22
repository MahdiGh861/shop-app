import ProductList from "@/components/shared/product/productList";
import { Button } from "@/components/ui/button";
import { getLatestProducts } from "@/lib/actions/product.actions";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const Product = await getLatestProducts(5)
  return (
    <>
      <h1>صفحه اصلی </h1>
      <Image src="/images/banner/b-01.png" alt="banner" className="rounded-sm" width={1200} height={100}/>
      <ProductList data={Product} limit={4} />
      <Link href="/product" className="flex justify-center items-center text-center">
      <Button variant="secondary" className="cursor-pointer">تمامی محصولات</Button>
      </Link>
    </>
  );
}
