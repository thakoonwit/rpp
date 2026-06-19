import { createClient } from '@/lib/supabase/server'
import { formatPrice, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Package, ShoppingCart, Users, TrendingUp, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [productsRes, ordersRes, categoriesRes] = await Promise.all([
    supabase.from('products').select('id, status', { count: 'exact' }) as any,
    supabase.from('orders').select('*, products(name, price)', { count: 'exact' }).order('created_at', { ascending: false }).limit(10) as any,
    supabase.from('categories').select('id', { count: 'exact' }) as any,
  ])


  const totalProducts = productsRes.count || 0
  const activeProducts = productsRes.data?.filter((p: any) => p.status === 'active').length || 0
  const soldProducts = productsRes.data?.filter((p: any) => p.status === 'sold').length || 0

  const totalOrders = ordersRes.count || 0
  const recentOrders = ordersRes.data || []

  const statusBadgeMap: Record<string, 'active' | 'sold' | 'draft' | 'reserved' | 'default'> = {
    pending: 'default',
    confirmed: 'active',
    completed: 'sold',
    cancelled: 'draft',
  }

  const statusLabelMap: Record<string, string> = {
    pending: 'รอดำเนินการ',
    confirmed: 'ยืนยันแล้ว',
    completed: 'เสร็จสิ้น',
    cancelled: 'ยกเลิก',
  }

  return (
    <div className="lg:pt-0 pt-14">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">
          ดาชบอร์ด
        </h1>
        <p className="text-[#5A5A5A] text-sm font-[family-name:var(--font-sarabun)] mt-1">
          ภาพรวมระบบ RPSZZ
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'สินค้าทั้งหมด', value: totalProducts, icon: Package, sub: `${activeProducts} พร้อมขาย`, href: '/administrator/products' },
          { label: 'ขายแล้ว', value: soldProducts, icon: TrendingUp, sub: `จาก ${totalProducts} รายการ`, href: '/administrator/products' },
          { label: 'คำสั่งซื้อ', value: totalOrders, icon: ShoppingCart, sub: 'รวมทั้งหมด', href: '/administrator/orders' },
          { label: 'หมวดหมู่', value: categoriesRes.count || 0, icon: Users, sub: 'หมวดหมู่สินค้า', href: '/administrator/categories' },
        ].map(({ label, value, icon: Icon, sub, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl border border-[#E5E5E5] p-5 flex flex-col gap-3 hover:border-[#2A2A2A] transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)]">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-[#F8F8F8] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#5A5A5A]" />
              </div>
            </div>
            <p className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">{value}</p>
            <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)]">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Link
          href="/administrator/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#121212] text-white rounded-lg text-sm font-[family-name:var(--font-sarabun)] font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          เพิ่มสินค้า
        </Link>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E5] text-[#5A5A5A] rounded-lg text-sm font-[family-name:var(--font-sarabun)] font-medium hover:border-[#121212] hover:text-[#121212] transition-colors duration-200"
        >
          ดูหน้าเว็บไซต์
        </Link>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-[#E5E5E5]">
        <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-base">
            คำสั่งซื้อล่าสุด
          </h2>
          <Link
            href="/administrator/orders"
            className="text-xs text-[#5A5A5A] font-[family-name:var(--font-sarabun)] hover:text-[#121212] transition-colors"
          >
            ดูทั้งหมด →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-[#888] font-[family-name:var(--font-sarabun)] text-sm">
            ยังไม่มีคำสั่งซื้อ
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5]">
                  {['ชื่อลูกค้า', 'สินค้า', 'สถานะ', 'วันที่'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-[#888] font-[family-name:var(--font-sarabun)] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-[#F8F8F8] last:border-0 hover:bg-[#F8F8F8] transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-[family-name:var(--font-sarabun)] font-medium text-[#121212]">{order.customer_name}</p>
                      <p className="text-xs text-[#888]">{order.customer_email}</p>
                    </td>
                    <td className="px-5 py-3 text-[#5A5A5A] font-[family-name:var(--font-sarabun)]">
                      {(order.products as any)?.name || '-'}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={statusBadgeMap[order.status] || 'default'}>
                        {statusLabelMap[order.status] || order.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-[#888] text-xs font-[family-name:var(--font-sarabun)]">
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
