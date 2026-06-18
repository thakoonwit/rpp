'use client'

import { deleteProductImage } from '@/lib/actions/products'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DeleteImageButton({ imageId, productId }: { imageId: string; productId: string }) {
  const router = useRouter()

  async function handleDelete() {
    const result = await deleteProductImage(imageId, productId)
    if (result.error) {
      toast.error('ลบรูปไม่สำเร็จ')
      return
    }
    toast.success('ลบรูปแล้ว')
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow text-[#888] hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
      aria-label="ลบรูปภาพ"
    >
      <Trash2 className="w-3 h-3" />
    </button>
  )
}
