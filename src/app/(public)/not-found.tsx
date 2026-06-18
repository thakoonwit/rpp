import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="font-[family-name:var(--font-prompt)] font-bold text-8xl text-[#E5E5E5] mb-4">404</div>
      <h1 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl mb-2">
        ไม่พบหน้าที่ที่คุณต้องการ
      </h1>
      <p className="text-[#5A5A5A] font-[family-name:var(--font-sarabun)] text-base mb-8">
        สินค้าหรือหน้าที่นี้อาจถูกลบหรือย้ายไปแล้ว
      </p>
      <Button asChild>
        <Link href="/products">ดูสินค้าทั้งหมด</Link>
      </Button>
    </div>
  )
}
