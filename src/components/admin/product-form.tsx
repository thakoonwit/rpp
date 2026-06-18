'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createProduct, updateProduct } from '@/lib/actions/products'
import { toast } from 'sonner'
import type { Database } from '@/lib/database.types'
import { Save } from 'lucide-react'

type Category = Database['public']['Tables']['categories']['Row']
type Product = Database['public']['Tables']['products']['Row']

const CONDITION_GRADES = [
  { value: 'like-new', label: '99% Like New' },
  { value: 'excellent', label: '95% Excellent' },
  { value: 'very-good', label: '90% Very Good' },
  { value: 'good', label: '85% Good' },
  { value: 'fair', label: '80% Fair' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'พร้อมขาย' },
  { value: 'draft', label: 'แบบร่าง' },
  { value: 'reserved', label: 'จองแล้ว' },
  { value: 'sold', label: 'ขายแล้ว' },
]

export function ProductForm({
  product,
  categories,
}: {
  product?: Product
  categories: Category[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [grade, setGrade] = useState(product?.condition_grade || 'very-good')
  const [status, setStatus] = useState(product?.status || 'active')
  const [categoryId, setCategoryId] = useState(product?.category_id || '')
  const [featured, setFeatured] = useState(product?.featured || false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('condition_grade', grade)
    formData.set('status', status)
    formData.set('category_id', categoryId)
    formData.set('featured', featured.toString())

    startTransition(async () => {
      if (product) {
        const result = await updateProduct(product.id, formData)
        if (result?.error) {
          toast.error(result.error)
          return
        }
        toast.success('อัปเดตสินค้าแล้ว')
      } else {
        await createProduct(formData)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="name">ชื่อสินค้า *</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product?.name}
            required
            placeholder="เช่น iPhone 13 128GB"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <Label>หมวดหมู่</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger id="category-select">
              <SelectValue placeholder="เลือกหมวดหมู่..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="price">ราคา (บาท) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            defaultValue={product?.price}
            required
            placeholder="0"
          />
        </div>

        {/* Condition grade */}
        <div className="flex flex-col gap-1.5">
          <Label>เกรดสภาพ *</Label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger id="grade-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CONDITION_GRADES.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition percent */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="condition_percent">เปอร์เซ็นต์สภาพ (80-99) *</Label>
          <Input
            id="condition_percent"
            name="condition_percent"
            type="number"
            min="80"
            max="99"
            defaultValue={product?.condition_percent || 90}
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <Label>สถานะ</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="description">คำอธิบายสินค้า</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={product?.description || ''}
            placeholder="อธิบายสินค้าโดยย่อ..."
            rows={3}
          />
        </div>

        {/* Inspection notes */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inspection_notes">ผลการตรวจสอบ</Label>
          <Textarea
            id="inspection_notes"
            name="inspection_notes"
            defaultValue={product?.inspection_notes || ''}
            placeholder="บันทึกผลการตรวจสอบ..."
            rows={4}
          />
        </div>

        {/* Repair notes */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="repair_notes">บันทึกการซ่อม</Label>
          <Textarea
            id="repair_notes"
            name="repair_notes"
            defaultValue={product?.repair_notes || ''}
            placeholder="เคยซ่อมอะไรหรือเปลี่ยนอะไรบ้าง..."
            rows={4}
          />
        </div>

        {/* Featured toggle */}
        <div className="md:col-span-2 flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-[#121212] cursor-pointer"
          />
          <Label htmlFor="featured" className="cursor-pointer">
            แสดงในสินค้าแนะนำ (Featured)
          </Label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending} size="lg">
          <Save className="w-4 h-4" />
          {isPending ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/administrator/products')}
        >
          ยกเลิก
        </Button>
      </div>
    </form>
  )
}
