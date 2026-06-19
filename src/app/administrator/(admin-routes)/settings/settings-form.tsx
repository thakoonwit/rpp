'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { upsertSetting } from '@/lib/actions/settings'
import { toast } from 'sonner'
import { Save } from 'lucide-react'

interface SettingsFormProps {
  initialSettings: Record<string, string>
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const keys = [
          'site_name',
          'site_tagline',
          'site_phone',
          'site_email',
          'site_line',
          'site_instagram',
          'business_hours',
          'site_address',
        ]

        for (const key of keys) {
          const value = formData.get(key) as string
          const res = await upsertSetting(key, value || '')
          if (res?.error) {
            toast.error(`เกิดข้อผิดพลาดในการบันทึก ${key}: ${res.error}`)
            return
          }
        }

        toast.success('บันทึกการตั้งค่าสำเร็จ')
      } catch (err: any) {
        toast.error('เกิดข้อผิดพลาด: ' + (err.message || err))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-[#E5E5E5]">
      <div className="grid gap-4">
        {/* Site Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="site_name">ชื่อร้าน</Label>
          <Input
            id="site_name"
            name="site_name"
            defaultValue={initialSettings['site_name'] || ''}
            required
            placeholder="ตัวอย่าง: RPSZZ"
          />
        </div>

        {/* Tagline */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="site_tagline">สโลแกนร้าน / คำโปรย</Label>
          <Input
            id="site_tagline"
            name="site_tagline"
            defaultValue={initialSettings['site_tagline'] || ''}
            placeholder="ตัวอย่าง: ของดี ไม่ต้องแพง"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="site_phone">เบอร์โทรศัพท์ติดต่อ</Label>
            <Input
              id="site_phone"
              name="site_phone"
              defaultValue={initialSettings['site_phone'] || ''}
              placeholder="ตัวอย่าง: 080-123-4567"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="site_email">อีเมลติดต่อ</Label>
            <Input
              id="site_email"
              name="site_email"
              type="email"
              defaultValue={initialSettings['site_email'] || ''}
              placeholder="ตัวอย่าง: contact@rpszz.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Line */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="site_line">Line ID</Label>
            <Input
              id="site_line"
              name="site_line"
              defaultValue={initialSettings['site_line'] || ''}
              placeholder="ตัวอย่าง: @rpszz"
            />
          </div>

          {/* Instagram */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="site_instagram">Instagram</Label>
            <Input
              id="site_instagram"
              name="site_instagram"
              defaultValue={initialSettings['site_instagram'] || ''}
              placeholder="ตัวอย่าง: rpszz_official"
            />
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="business_hours">เวลาทำการ</Label>
          <Input
            id="business_hours"
            name="business_hours"
            defaultValue={initialSettings['business_hours'] || ''}
            placeholder="ตัวอย่าง: จันทร์ - อาทิตย์ 10:00 - 20:00 น."
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="site_address">ที่อยู่ / พิกัดร้าน</Label>
          <Textarea
            id="site_address"
            name="site_address"
            defaultValue={initialSettings['site_address'] || ''}
            placeholder="ตัวอย่าง: กรุงเทพมหานคร"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#E5E5E5]">
        <Button type="submit" disabled={isPending} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {isPending ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
        </Button>
      </div>
    </form>
  )
}
