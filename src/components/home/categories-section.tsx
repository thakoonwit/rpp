import Link from 'next/link'
import { getCategories } from '@/lib/actions/categories'

export async function CategoriesSection() {
  const { categories } = await getCategories()

  if (!categories || categories.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-[#F8F8F8]" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="categories-heading"
            className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-wrap-balance"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            หมวดหมู่สินค้า
          </h2>
          <p className="text-[#5A5A5A] text-sm font-[family-name:var(--font-sarabun)] mt-2">
            เลือกหมวดหมู่ที่สนใจ
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat: any) => (

            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-[#E5E5E5] hover:border-[#121212] hover:shadow-md transition-all duration-300"
              aria-label={`หมวดหมู่ ${cat.name}`}
            >
              <span
                className="text-3xl group-hover:scale-110 transition-transform duration-300"
                role="img"
                aria-hidden="true"
              >
                {cat.icon || '📦'}
              </span>
              <span className="font-[family-name:var(--font-sarabun)] font-semibold text-sm text-[#121212] text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
