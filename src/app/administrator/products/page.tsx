import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatPrice, formatDate } from '@/lib/utils'
import { ConditionBadge } from '@/components/products/condition-badge'
import { Plus, Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DeleteProductButton } from '@/components/admin/delete-product-button'

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products } = (await supabase
    .from('products')
    .select('*, categories(name), product_images(url, is_primary)')
    .order('created_at', { ascending: false })) as any


  const statusBadgeMap: Record<string, 'active' | 'sold' | 'draft' | 'reserved'> = {
    active: 'active',
    sold: 'sold',
    draft: 'draft',
    reserved: 'reserved',
  }

  const statusLabelMap: Record<string, string> = {
    active: 'พร้อมขาย',
    sold: 'ขายแล้ว',
    draft: 'แบบร่าง',
    reserved: 'จองแล้ว',
  }

  return (
    <div className="lg:pt-0 pt-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">สินค้าทั้งหมด</h1>
          <p className="text-[#888] text-sm font-[family-name:var(--font-sarabun)] mt-1">{products?.length || 0} รายการ</p>
        </div>
        <Link
          href="/administrator/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#121212] text-white rounded-lg text-sm font-[family-name:var(--font-sarabun)] font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          เพิ่มสินค้า
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F8F8F8]">
                {['สินค้า', 'หมวดหมู่', 'ราคา', 'สภาพ', 'สถานะ', 'วันที่', 'จัดการ'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-[#888] font-[family-name:var(--font-sarabun)] font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products?.map((product: any) => (

                <tr key={product.id} className="border-b border-[#F8F8F8] last:border-0 hover:bg-[#F8F8F8] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-sarabun)] font-semibold text-[#121212] line-clamp-1 max-w-[200px]">{product.name}</p>
                    <p className="text-xs text-[#888]">{product.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-[#5A5A5A] font-[family-name:var(--font-sarabun)] text-xs">
                    {(product.categories as any)?.name || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-prompt)] font-bold text-[#121212]">{formatPrice(product.price)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <ConditionBadge percent={product.condition_percent} grade={product.condition_grade} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeMap[product.status] || 'default'}>
                      {statusLabelMap[product.status] || product.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[#888] text-xs font-[family-name:var(--font-sarabun)] whitespace-nowrap">
                    {formatDate(product.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/administrator/products/${product.id}/edit`}
                        className="p-1.5 text-[#5A5A5A] hover:text-[#121212] hover:bg-[#F0F0F0] rounded-md transition-colors"
                        aria-label={`แก้ไข ${product.name}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(!products || products.length === 0) && (
          <div className="p-12 text-center">
            <p className="text-[#888] font-[family-name:var(--font-sarabun)] text-sm">ยังไม่มีสินค้า</p>
            <Link
              href="/administrator/products/new"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#121212] text-white rounded-lg text-sm font-[family-name:var(--font-sarabun)] hover:bg-[#2A2A2A] transition-colors"
            >
              <Plus className="w-4 h-4" />
              เพิ่มสินค้าแรก
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
