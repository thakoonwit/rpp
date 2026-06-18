import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/product-form'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order')

  return (
    <div className="lg:pt-0 pt-14 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">
          เพิ่มสินค้าใหม่
        </h1>
      </div>
      <div className="bg-white rounded-xl border border-[#E5E5E5] p-6">
        <ProductForm categories={categories || []} />
      </div>
    </div>
  )
}
