import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ConditionBadge } from './condition-badge'
import type { Database } from '@/lib/database.types'

type Product = Database['public']['Tables']['products']['Row'] & {
  product_images?: Database['public']['Tables']['product_images']['Row'][]
  categories?: Database['public']['Tables']['categories']['Row'] | null
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.product_images?.find(img => img.is_primary) ||
    product.product_images?.[0]

  const isSold = product.status === 'sold'

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:border-[#2A2A2A] hover:shadow-lg transition-all duration-300"
      aria-label={`${product.name} ราคา ${formatPrice(product.price)}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F8F8F8]">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-transform duration-500 group-hover:scale-105',
              isSold && 'opacity-50 grayscale'
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-20">📦</span>
          </div>
        )}

        {/* Condition badge — top left */}
        <div className="absolute top-2 left-2 z-10">
          <ConditionBadge
            percent={product.condition_percent}
            grade={product.condition_grade}
            size="sm"
          />
        </div>

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="font-[family-name:var(--font-prompt)] font-bold text-white text-lg tracking-widest">SOLD</span>
          </div>
        )}

        {/* Reserved badge */}
        {product.status === 'reserved' && (
          <div className="absolute top-2 right-2 z-10">
            <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded font-[family-name:var(--font-prompt)]">จอง</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        {/* Category */}
        {product.categories && (
          <span className="text-[10px] font-medium text-[#5A5A5A] font-[family-name:var(--font-sarabun)] uppercase tracking-wide">
            {product.categories.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-bold text-sm text-[#121212] font-[family-name:var(--font-prompt)] leading-tight line-clamp-2 group-hover:text-[#2A2A2A]">
          {product.name}
        </h3>

        {/* Price */}
        <p className="font-bold text-lg text-[#121212] font-[family-name:var(--font-prompt)] mt-auto pt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
