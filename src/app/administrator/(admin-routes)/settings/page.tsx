import { getSettings } from '@/lib/actions/settings'
import { SettingsForm } from './settings-form'

export default async function AdminSettingsPage() {
  const { settings } = await getSettings()

  return (
    <div className="lg:pt-0 pt-14">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl">ตั้งค่าเว็บ</h1>
        <p className="text-[#888] text-sm font-[family-name:var(--font-sarabun)] mt-1">
          ปรับแต่งข้อมูลการติดต่อและรายละเอียดร้านค้าของระบบ
        </p>
      </div>

      <SettingsForm initialSettings={settings || {}} />
    </div>
  )
}
