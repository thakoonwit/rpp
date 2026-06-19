import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function SellCTA() {
  return (
    <section className="py-16 md:py-20 bg-[#F8F8F8]" aria-label="ต้องการขายสินค้า">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#121212] rounded-2xl p-10 md:p-14">
          <h2 className="font-[family-name:var(--font-prompt)] font-bold !text-white text-wrap-balance mb-4"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            อยากขายของกับเรา?
          </h2>
          <p className="font-[family-name:var(--font-sarabun)] !text-[#D9D9D9] text-base mb-8 leading-relaxed max-w-md mx-auto">
            เราซื้อสินค้ามือสองหลากหลายประเภท
            ประเมินราคาฟรีไม่มีค่าใช้จ่าย
          </p>
          <Button asChild size="lg" variant="white">
            <Link href="/contact">ติดต่อสอบถาม</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
