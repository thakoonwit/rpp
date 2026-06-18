'use client'

import { useState, useTransition } from 'react'
import { createCategory, deleteCategory } from '@/lib/actions/categories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Database } from '@/lib/database.types'

type Category = Database['public']['Tables']['categories']['Row']

export function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showForm, setShowForm] = useState(false)

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await createCategory(formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('เพิ่มหมวดหมู่แล้ว')
      setShowForm(false)
      router.refresh()
    })
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`ลบหมวดหมู่ "${name}" ?สินค้าในหมวดหมู่นี้จะไม่ถูกลบ`)) return
    const result = await deleteCategory(id)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success(`ลบ "${name}" แล้ว`)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Existing categories */}
      <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-4 px-5 py-4 border-b border-[#F8F8F8] last:border-0">
            <span className="text-2xl">{cat.icon || '📦'}</span>
            <div className="flex-1">
              <p className="font-[family-name:var(--font-sarabun)] font-semibold text-[#121212] text-sm">{cat.name}</p>
              <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)]">{cat.slug}</p>
            </div>
            <button
              onClick={() => handleDelete(cat.id, cat.name)}
              className="p-1.5 text-[#888] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              aria-label={`ลบ ${cat.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="p-8 text-center text-[#888] font-[family-name:var(--font-sarabun)] text-sm">ยังไม่มีหมวดหมู่</div>
        )}
      </div>

      {/* Add form */}
      {showForm ? (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-[#E5E5E5] p-5 flex flex-col gap-4">
          <h3 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-base">เพิ่มหมวดหมู่ใหม่</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cat-name">ชื่อ *</Label>
              <Input id="cat-name" name="name" required placeholder="เช่น มือถือ" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cat-icon">Icon (อีโมจิ)</Label>
              <Input id="cat-icon" name="icon" placeholder="📱" maxLength={4} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cat-desc">คำอธิบาย</Label>
            <Input id="cat-desc" name="description" placeholder="อธิบายหมวดหมู่" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cat-order">ลำดับ</Label>
            <Input id="cat-order" name="sort_order" type="number" defaultValue="0" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isPending}>{isPending ? 'กำลังเพิ่ม...' : 'เพิ่มหมวดหมู่'}</Button>
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>ยกเลิก</Button>
          </div>
        </form>
      ) : (
        <Button onClick={() => setShowForm(true)} variant="outline">
          <Plus className="w-4 h-4" />
          เพิ่มหมวดหมู่
        </Button>
      )}
    </div>
  )
}
