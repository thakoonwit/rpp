import { createClient } from '@/lib/supabase/server'
import { formatDate, formatPrice } from '@/lib/utils'

interface Customer {
  email: string
  name: string
  phone: string
  orderCount: number
  totalSpent: number
  createdAtEarliest: string
}

export default async function AdminCustomersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*, products(name, price)')
    .order('created_at', { ascending: false })

  // Group by customer_email
  const customerMap: Record<string, Customer> = {}

  orders?.forEach((order: any) => {
    const email = order.customer_email.trim().toLowerCase()
    const price = order.products?.price || 0
    const isCancelled = order.status === 'cancelled'

    if (!customerMap[email]) {
      customerMap[email] = {
        email: order.customer_email,
        name: order.customer_name,
        phone: order.customer_phone || '-',
        orderCount: 1,
        totalSpent: isCancelled ? 0 : price,
        createdAtEarliest: order.created_at,
      }
    } else {
      customerMap[email].orderCount += 1
      if (!isCancelled) {
        customerMap[email].totalSpent += price
      }
      // Since orders are sorted descending, the last one in loop is the earliest
      customerMap[email].createdAtEarliest = order.created_at
    }
  })

  const customers = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent)

  return (
    <div className="lg:pt-0 pt-14">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">ลูกค้า</h1>
        <p className="text-[#888] text-sm font-[family-name:var(--font-sarabun)] mt-1">ทั้งหมด {customers.length} รายการ (เรียงตามยอดซื้อสะสม)</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F8F8F8]">
                {['ชื่อลูกค้า', 'อีเมล', 'เบอร์โทร', 'จำนวนคำสั่งซื้อ', 'ยอดซื้อสะสม', 'ลูกค้าตั้งแต่'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-[#888] font-[family-name:var(--font-sarabun)] font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.email} className="border-b border-[#F8F8F8] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-150">
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-sarabun)] font-semibold text-[#121212]">{customer.name}</p>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-sarabun)] text-[#5A5A5A]">
                    {customer.email}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-sarabun)] text-[#5A5A5A]">
                    {customer.phone}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-sarabun)] text-[#121212] font-semibold">
                    {customer.orderCount}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-sarabun)] text-emerald-600 font-bold">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="px-4 py-3 text-[#888] text-xs font-[family-name:var(--font-sarabun)] whitespace-nowrap">
                    {formatDate(customer.createdAtEarliest)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {customers.length === 0 && (
          <div className="p-8 text-center text-[#888] font-[family-name:var(--font-sarabun)] text-sm">ยังไม่มีประวัติลูกค้า</div>
        )}
      </div>
    </div>
  )
}
