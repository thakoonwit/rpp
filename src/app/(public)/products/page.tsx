import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createPublicClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductGridSkeleton } from '@/components/products/product-skeleton'
import { getProducts } from '@/lib/actions/products'


import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'สินค้าทั้งหมด',
  description: 'เลือกซื้อสินค้ามือสองคุณภาพดี ผ่านการตรวจสอบและซ่อมแซมโดย RPSZZ',
}

const STATUS_FILTERS = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'active', label: 'พร้อมขาย' },
  { value: 'reserved', label: 'จองแล้ว' },
  { value: 'sold', label: 'ขายแล้ว' },
]

async function ProductsContent({
  search,
  status,
  page,
}: {
  search?: string
  status?: string
  page?: number
}) {
  const currentPage = page || 1
  const limit = 20
  const { products, total: count } = await getProducts({
    page: currentPage,
    limit,
    status,
    search,
  })
  const totalPages = Math.ceil((count || 0) / limit)

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)]">
          พบ {count || 0} รายการ
        </p>
      </div>
      <ProductGrid
        products={products || []}
        emptyMessage="ไม่พบสินค้าที่ตรงกับเงื่อนไขที่เลือก"
      />
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?${new URLSearchParams({
                ...(search ? { search } : {}),
                ...(status ? { status } : {}),
                page: p.toString(),
              })}`}
              className={cn(
                'w-9 h-9 flex items-center justify-center rounded-md text-sm font-[family-name:var(--font-sarabun)] border transition-colors duration-200',
                currentPage === p
                  ? 'bg-[#121212] text-white border-[#121212]'
                  : 'border-[#E5E5E5] text-[#5A5A5A] hover:border-[#121212] hover:text-[#121212]'
              )}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; status?: string; page?: string }>
}) {
  const params = await searchParams
  const search = params.search
  const status = params.status
  const page = params.page ? parseInt(params.page) : 1

  const supabase = createPublicClient()
  const { data: categories } = (await supabase
    .from('categories')
    .select('id, name, slug')
    .order('sort_order')) as any


  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#121212] pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-prompt)] font-bold text-white text-3xl md:text-4xl mb-2">
            สินค้าทั้งหมด
          </h1>
          <p className="text-[#888] font-[family-name:var(--font-sarabun)] text-sm">
            สินค้ามือสองผ่านการตรวจสอบสภาพในราคาที่เข้าถึงได้
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <form method="GET" className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
              <Input
                name="search"
                defaultValue={search}
                placeholder="ค้นหาสินค้า..."
                className="pl-9"
              />
            </div>
            <Button type="submit">ค้นหา</Button>
          </form>

          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <Link
                key={f.value}
                href={`/products?${new URLSearchParams({
                  ...(search ? { search } : {}),
                  ...(f.value ? { status: f.value } : {}),
                })}`}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-[family-name:var(--font-sarabun)] border transition-colors duration-200',
                  status === f.value || (!status && !f.value)
                    ? 'bg-[#121212] text-white border-[#121212]'
                    : 'border-[#E5E5E5] text-[#5A5A5A] hover:border-[#121212] hover:text-[#121212]'
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Category pills */}
        {categories && categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            <Link
              href="/products"
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-sarabun)] border transition-colors duration-200',
                !params.category
                  ? 'bg-[#121212] text-white border-[#121212]'
                  : 'border-[#E5E5E5] text-[#5A5A5A] hover:border-[#121212]'
              )}
            >
              ทั้งหมด
            </Link>
            {categories.map((cat: any) => (

              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-sarabun)] border border-[#E5E5E5] text-[#5A5A5A] hover:border-[#121212] hover:text-[#121212] transition-colors duration-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Products */}
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductsContent search={search} status={status} page={page} />
        </Suspense>

      </div>
    </div>
  )
}
