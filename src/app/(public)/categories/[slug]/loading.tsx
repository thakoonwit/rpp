import { ProductGridSkeleton } from '@/components/products/product-skeleton'
import { ArrowLeft } from 'lucide-react'

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header skeleton */}
      <div className="bg-[#121212] pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="inline-flex items-center gap-1.5 text-sm text-[#888] mb-3">
            <ArrowLeft className="w-4 h-4" />
            หมวดหมู่ทั้งหมด
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2A2A2A] rounded-full" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-[#2A2A2A] rounded" />
              <div className="h-4 w-64 bg-[#2A2A2A] rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}
