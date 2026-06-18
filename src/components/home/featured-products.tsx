import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/products/product-card'

export async function FeaturedProducts() {
  const supabase = await createClient()

  const { data: products } = (await supabase
    .from('products')
    .select(`
      *,
      product_images(*),
      categories(*)
    `)
    .eq('featured', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(8)) as any


  if (!products || products.length === 0) return null

  return (
    <section className="py-16 md:py-20" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              id="featured-heading"
              className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-wrap-balance"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
            >
              สินค้าแนะนำ
            </h2>
            <p className="text-[#5A5A5A] text-sm font-[family-name:var(--font-sarabun)] mt-1">
              คัดมาแล้ว คุ้มค่าแน่นอน
            </p>
          </div>
          <Link
            href="/products?featured=true"
            className="hidden sm:flex items-center gap-1.5 text-sm font-[family-name:var(--font-sarabun)] font-medium text-[#5A5A5A] hover:text-[#121212] transition-colors duration-200"
          >
            ดูทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
           {products.map((product: any) => (

            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile see all */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/products?featured=true"
            className="inline-flex items-center gap-1.5 text-sm font-[family-name:var(--font-sarabun)] font-medium text-[#5A5A5A] hover:text-[#121212] transition-colors duration-200"
          >
            ดูสินค้าแนะนำทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
