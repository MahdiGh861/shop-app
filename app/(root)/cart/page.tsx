import { getCart } from '@/lib/actions/cart.actions'
import Cart from '@/components/shared/cart/cart'

export default async function CartPage() {
  const cart = await getCart()

  return (
    <div className="max-w-7xl mx-auto px-10 py-8">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>
      <Cart cart={cart} />
    </div>
  )
}
