import ProductList from '@/components/shared/product/productList'
import SearchBar from '@/components/shared/product/SearchBar'
import { searchProducts, SortOption } from '@/lib/actions/product.actions'
import { Suspense } from 'react'

async function Product({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, category, sort } = await searchParams

  const products = await searchProducts({
    query: typeof query === 'string' ? query : undefined,
    category: typeof category === 'string' ? category : undefined,
    sort: (typeof sort === 'string' ? sort : 'newest') as SortOption,
  })

  return (
    <div>
      <Suspense>
        <SearchBar />
      </Suspense>
      <ProductList data={products} />
    </div>
  )
}

export default Product
