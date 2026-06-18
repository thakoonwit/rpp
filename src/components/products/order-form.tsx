'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createOrder } from '@/lib/actions/orders'
import { toast } from 'sonner'
import { MessageSquare } from 'lucide-react'

export function OrderForm({
  productId,
  productName,
}: {
  productId: string
  productName: string
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append('product_id', productId)

    const result = await createOrder(formData)

    setLoading(false)

    if (result.error) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
      return
    }

    toast.success('ส่งคำชื้อแล้ว! ทีมงานจะติดต่อกลับหาคุณโดยเร็วที่สุด')
    setOpen(false)
  }

  if (!open) {
    return (
      <Button size="lg" className="w-full mt-2" onClick={() => setOpen(true)}>
        <MessageSquare className="w-4 h-4" />
        สอบถาม / จองซื้อ
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 p-5 bg-[#F8F8F8] rounded-xl border border-[#E5E5E5]">
      <h3 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-base">
        สอบถามเกี่ยวกับ: {productName}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customer_name">ชื่อ *</Label>
          <Input id="customer_name" name="customer_name" required placeholder="ชื่อ-นามสกุล" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customer_phone">เบอร์โทร</Label>
          <Input id="customer_phone" name="customer_phone" type="tel" placeholder="08x-xxx-xxxx" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="customer_email">อีเมล *</Label>
        <Input id="customer_email" name="customer_email" type="email" required placeholder="email@example.com" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">ข้อความเพิ่มเติม</Label>
        <Textarea id="notes" name="notes" placeholder="สอบถามหรือแจ้งความต้องการเพิ่มเติมได้เลย" rows={3} />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'กำลังส่ง...' : 'ส่งคำถาม'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
          ยกเลิก
        </Button>
      </div>
    </form>
  )
}
