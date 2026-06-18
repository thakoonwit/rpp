import { createClient } from '@/lib/supabase/server'
import { formatDate, formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { OrderStatusUpdater } from '@/components/admin/order-status-updater'

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*, products(name, price)')
    .order('created_at', { ascending: false })

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
        <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">คำสั่งซื้อ</h1>
        <p className="text-[#888] text-sm font-[family-name:var(--font-sarabun)] mt-1">{orders?.length || 0} รายการ</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F8F8F8]">
                {['ชื่อลูกค้า', 'ติดต่อ', 'สินค้า', 'สถานะ', 'วันที่', 'อัปเดตสถานะ'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-[#888] font-[family-name:var(--font-sarabun)] font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any) => (
                <tr key={order.id} className="border-b border-[#F8F8F8] last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-sarabun)] font-semibold text-[#121212]">{order.customer_name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-[#5A5A5A]">{order.customer_email}</p>
                    <p className="text-xs text-[#888]">{order.customer_phone || '-'}</p>
                  </td>
                  <td className="px-4 py-3 text-[#5A5A5A] font-[family-name:var(--font-sarabun)] text-xs">
                    {order.products?.name || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeMap[order.status] || 'default'}>
                      {statusLabelMap[order.status] || order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[#888] text-xs font-[family-name:var(--font-sarabun)] whitespace-nowrap">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!orders || orders.length === 0) && (
          <div className="p-8 text-center text-[#888] font-[family-name:var(--font-sarabun)] text-sm">ยังไม่มีคำสั่งซื้อ</div>
        )}
      </div>
    </div>
  )
}
