'use client'

import { useRef, useState } from 'react'
import { uploadProductImage } from '@/lib/actions/products'
import { toast } from 'sonner'
import { Upload, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ImageUploader({ productId }: { productId: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return

    setUploading(true)
    let successCount = 0

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} ไม่ใช่ไฟล์รูปภาพ`)
        continue
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} ใหญ่เกินไป (max 5MB)`)
        continue
      }

      const result = await uploadProductImage(productId, file, successCount === 0)

      if (result.error) {
        toast.error(`อัปโหลด ${file.name} ไม่สำเร็จ`)
      } else {
        successCount++
      }
    }

    setUploading(false)

    if (successCount > 0) {
      toast.success(`อัปโหลดเสร็จ ${successCount} ภาพ`)
      router.refresh()
    }
  }

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-[#121212] bg-[#F8F8F8]'
            : 'border-[#D9D9D9] hover:border-[#5A5A5A]'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        role="button"
        aria-label="อัปโหลดรูปภาพ"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-[#5A5A5A] animate-spin" />
            <p className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)]">กำลังอัปโหลด...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-[#888]" />
            <p className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)]">คลิกหรือลากวางรูปภาพ</p>
            <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)]">รองรับ JPG, PNG, WebP (max 5MB)</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
