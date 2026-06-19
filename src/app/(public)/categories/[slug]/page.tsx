import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createPublicClient } from '@/lib/supabase/server'
import { getProducts } from '@/lib/actions/products'


export const dynamicParams = true
export const revalidate = 3600

import { createAdminClient } from '@/lib/supabase/admin'

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data: categories } = await (supabase
    .from('categories') as any)
    .select('slug')

  return categories?.map((c: any) => ({
    slug: c.slug,
  })) || []
}


import { ProductGrid } from '@/components/products/product-grid'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)


  const cat = data?.[0] as any


  if (!cat) return { title: 'ไม่พบหมวดหมู่' }
  return {
    title: cat.name,
    description: cat.description || `สินค้าในหมวดหมู่ ${cat.name}`,
  }
}


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = createPublicClient()

  const { data: category } = (await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()) as any


  if (!category) notFound()

  const { products } = await getProducts({
    category: slug,
  })


  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#121212] pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-white font-[family-name:var(--font-sarabun)] transition-colors duration-200 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            หมวดหมู่ทั้งหมด
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h1 className="font-[family-name:var(--font-prompt)] font-bold text-white text-3xl">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-[#888] text-sm font-[family-name:var(--font-sarabun)] mt-1">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid
          products={products || []}
          emptyMessage={`ยังไม่มีสินค้าในหมวดหมู่ ${category.name}`}
        />
      </div>
    </div>
  )
}
