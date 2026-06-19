import React from 'react'

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-[#E5E5E5] overflow-hidden animate-pulse">
      {/* Image box skeleton */}
      <div className="relative aspect-square bg-[#F0F0F0]" />
      
      {/* Content skeleton */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* Category skeleton */}
        <div className="h-3 w-16 bg-[#F0F0F0] rounded" />
        
        {/* Title skeleton */}
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-[#F0F0F0] rounded" />
          <div className="h-4 w-3/4 bg-[#F0F0F0] rounded" />
        </div>
        
        {/* Price skeleton */}
        <div className="h-5 w-24 bg-[#F0F0F0] rounded mt-auto pt-1" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
