'use server'
import { prisma } from '@/lib/prisma'
import { convertToPlainObject } from '../utils'

export async function getLatestProducts(count:number) {
    const data = await prisma.product.findMany({
        take: count,
        orderBy: { createdAt: 'desc' }
    })
    return convertToPlainObject(data)
}

export async function getProductBySlug(slug: string) {
    const data = await prisma.product.findUnique({
        where: { slug : slug }
    })
    return data ? convertToPlainObject(data) : null
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name'

export async function searchProducts({
  query,
  category,
  sort,
}: {
  query?: string
  category?: string
  sort?: SortOption
}) {
  const where: Record<string, unknown> = {}

  if (query) {
    where.OR = [
      { name: { contains: query } },
      { brand: { contains: query } },
    ]
  }

  if (category) {
    where.category = category
  }

  const orderBy: Record<string, string> =
    sort === 'price-asc'
      ? { price: 'asc' }
      : sort === 'price-desc'
        ? { price: 'desc' }
        : sort === 'name'
          ? { name: 'asc' }
          : { createdAt: 'desc' }

  const data = await prisma.product.findMany({
    where,
    orderBy,
  })

  return convertToPlainObject(data)
}