import { createClient } from '@/lib/supabase/server'
import { CategoryManager } from '@/components/admin/category-manager'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')

  return (
    <div className="lg:pt-0 pt-14 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">จัดการหมวดหมู่</h1>
      </div>
      <CategoryManager categories={categories || []} />
    </div>
  )
}
