import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Wrench, ClipboardList } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const dynamicParams = true
export const revalidate = 3600

import { createAdminClient } from '@/lib/supabase/admin'

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data: products } = await (supabase
    .from('products') as any)
    .select('slug')
    .eq('status', 'active')

  return products?.map((p: any) => ({
    slug: p.slug,
  })) || []
}


import { ConditionBadge } from '@/components/products/condition-badge'
import { Button } from '@/components/ui/button'
import { formatPrice, formatDate } from '@/lib/utils'
import { OrderForm } from '@/components/products/order-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = (await supabase
    .from('products')
    .select('name, description, price, condition_percent, condition_grade')
    .eq('slug', slug)
    .single()) as any


  if (!product) return { title: 'ไม่พบสินค้า' }

  return {
    title: product.name,
    description: product.description || `${product.name} สภาพ ${product.condition_percent}% ราคา ${formatPrice(product.price)}`,
    openGraph: {
      title: product.name,
      description: product.description || '',
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = (await supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .eq('slug', slug)
    .neq('status', 'draft')
    .single()) as any


  if (!product) notFound()

  const sortedImages = [...(product.product_images || [])].sort(
    (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)
  )

  const isSold = product.status === 'sold'

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'THB',
      availability: isSold
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
    },
    brand: { '@type': 'Brand', name: 'RPSZZ' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <div className="pt-20 pb-4 bg-[#F8F8F8] border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-[#5A5A5A] hover:text-[#121212] font-[family-name:var(--font-sarabun)] transition-colors duration-200 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับไปดูสินค้า
            </Link>
            {product.categories && (
              <div className="flex items-center gap-2 text-xs text-[#888] font-[family-name:var(--font-sarabun)]">
                <Link href="/" className="hover:text-[#121212]">RPSZZ</Link>
                <span>/</span>
                <Link href={`/categories/${product.categories.slug}`} className="hover:text-[#121212]">
                  {product.categories.name}
                </Link>
                <span>/</span>
                <span className="text-[#121212]">{product.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
            {/* Images */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8F8F8]">
                {sortedImages[0] ? (
                  <Image
                    src={sortedImages[0].url}
                    alt={sortedImages[0].alt || product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-20">📦</span>
                  </div>
                )}
                {isSold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="font-[family-name:var(--font-prompt)] font-bold text-white text-3xl tracking-widest">SOLD</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {sortedImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {sortedImages.slice(0, 4).map((img, i) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-lg overflow-hidden bg-[#F8F8F8] border-2 border-transparent hover:border-[#121212] transition-colors duration-200"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || `${product.name} ภาพที่ ${i + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-5">
              {/* Category + condition */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.categories && (
                  <Link
                    href={`/categories/${product.categories.slug}`}
                    className="text-xs font-[family-name:var(--font-sarabun)] text-[#5A5A5A] hover:text-[#121212] transition-colors duration-200"
                  >
                    {product.categories.name}
                  </Link>
                )}
                <ConditionBadge
                  percent={product.condition_percent}
                  grade={product.condition_grade}
                  size="lg"
                />
                {isSold && (
                  <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full font-[family-name:var(--font-prompt)]">
                    ขายแล้ว
                  </span>
                )}
                {product.status === 'reserved' && (
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-[family-name:var(--font-prompt)]">
                    จองแล้ว
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl md:text-3xl leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <p className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-3xl md:text-4xl">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-[#5A5A5A] font-[family-name:var(--font-sarabun)] text-base leading-relaxed">
                  {product.description}
                </p>
              )}

              <div className="h-px bg-[#E5E5E5]" />

              {/* Inspection notes */}
              {product.inspection_notes && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-[#5A5A5A]" />
                    <h2 className="font-[family-name:var(--font-prompt)] font-semibold text-[#121212] text-sm">
                      ผลการตรวจสอบ
                    </h2>
                  </div>
                  <p className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)] leading-relaxed bg-[#F8F8F8] p-3 rounded-lg">
                    {product.inspection_notes}
                  </p>
                </div>
              )}

              {/* Repair notes */}
              {product.repair_notes && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#5A5A5A]" />
                    <h2 className="font-[family-name:var(--font-prompt)] font-semibold text-[#121212] text-sm">
                      บันทึกการซ่อม
                    </h2>
                  </div>
                  <p className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)] leading-relaxed bg-[#F8F8F8] p-3 rounded-lg">
                    {product.repair_notes}
                  </p>
                </div>
              )}

              <div className="h-px bg-[#E5E5E5]" />

              {/* Trust signals */}
              <div className="flex flex-col gap-2">
                {[
                  'คัดและตรวจสอบโดยทีมงาน RPSZZ',
                  'แจ้งสภาพจริงทุกอย่างไม่ปิดบัง',
                  'มีสภาพจริงตามที่แจ้ง',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)]">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {!isSold ? (
                <OrderForm productId={product.id} productName={product.name} />
              ) : (
                <div className="mt-2">
                  <Button disabled size="lg" className="w-full opacity-60">
                    สินค้านี้ขายแล้ว
                  </Button>
                  <p className="text-center text-xs text-[#888] mt-2 font-[family-name:var(--font-sarabun)]">
                    ดูสินค้าอื่น ที่ใกล้เคียงกัน
                  </p>
                </div>
              )}

              <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)] text-center">
                ลงประกาศเมื่อ {formatDate(product.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
