'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateOrderStatus } from '@/lib/actions/orders'

interface OrderStatusUpdaterProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusUpdater({ orderId, currentStatus }: OrderStatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true)
    try {
      const res = await updateOrderStatus(orderId, newStatus)
      if (res.error) {
        alert(res.error)
      } else {
        setStatus(newStatus)
      }
    } catch (err: any) {
      alert(err.message || 'Error updating status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select value={status} onValueChange={handleStatusChange} disabled={loading}>
      <SelectTrigger className="w-[130px] h-8 text-xs">
        <SelectValue placeholder="เลือกสถานะ" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">รอดำเนินการ</SelectItem>
        <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
        <SelectItem value="completed">เสร็จสิ้น</SelectItem>
        <SelectItem value="cancelled">ยกเลิก</SelectItem>
      </SelectContent>
    </Select>
  )
}
