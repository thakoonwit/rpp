'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from '@/lib/actions/products'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    const result = await deleteProduct(id)
    setLoading(false)

    if (result.error) {
      toast.error('เกิดข้อผิดพลาด: ' + result.error)
      return
    }

    toast.success(`ลบ "${name}" แล้ว`)
    router.refresh()
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-2 py-1 text-xs bg-red-600 text-white rounded font-[family-name:var(--font-sarabun)] hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? '...' : 'ยืนยัน'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-xs bg-[#F8F8F8] text-[#5A5A5A] rounded font-[family-name:var(--font-sarabun)] hover:bg-[#E5E5E5]"
        >
          ยกเลิก
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-[#888] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
      aria-label={`ลบ ${name}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
