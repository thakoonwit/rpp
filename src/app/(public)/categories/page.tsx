import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/actions/categories'

export const metadata: Metadata = {
  title: 'หมวดหมู่สินค้า',
  description: 'เลือกซื้อสินค้าตามหมวดหมู่ที่สนใจ',
}

export default async function CategoriesPage() {
  const { categories } = await getCategories()



  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#121212] pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-prompt)] font-bold text-white text-3xl md:text-4xl">
            หมวดหมู่สินค้า
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories?.map((cat: any) => (

            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#121212] hover:shadow-lg transition-all duration-300"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {cat.icon || '📦'}
              </span>
              <div className="text-center">
                <h2 className="font-[family-name:var(--font-prompt)] font-bold text-sm text-[#121212]">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)] mt-1">
                    {cat.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
