import Link from 'next/link'
import { ArrowRight, Search, Wrench, Percent, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-[#121212] flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background texture — subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            {/* Brand pill */}
            <div className="inline-flex items-center gap-2 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-[#888] font-[family-name:var(--font-sarabun)] tracking-wide">
                คัดเอง เช็คเอง ซ่อมเอง ขายเอง
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-[family-name:var(--font-prompt)] font-extrabold text-white leading-[1.1] text-wrap-balance">
              <span
                className="block"
                style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
              >
                ของดี
              </span>
              <span
                className="block text-[#D9D9D9]"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
              >
                ไม่ต้องแพง
              </span>
            </h1>

            {/* Sub */}
            <p className="text-[#888] font-[family-name:var(--font-sarabun)] text-lg leading-relaxed max-w-md">
              สินค้ามือสองที่ผ่านการตรวจสอบ ซ่อมแซม และทำความสะอาด
              <br />
              พร้อมแจ้งสภาพจริงทุกชิ้น
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" variant="white">
                <Link href="/products" className="flex items-center gap-2">
                  ดูสินค้าทั้งหมด
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline-white">
                <Link href="/about">ดูวิธีตรวจสอบ</Link>
              </Button>
            </div>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-[#2A2A2A]">
              <div>
                <p className="font-[family-name:var(--font-prompt)] font-bold text-white text-2xl">100%</p>
                <p className="text-[#5A5A5A] text-xs font-[family-name:var(--font-sarabun)]">แจ้งสภาพจริง</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-prompt)] font-bold text-white text-2xl">ทุกชิ้น</p>
                <p className="text-[#5A5A5A] text-xs font-[family-name:var(--font-sarabun)]">ผ่านการตรวจสอบ</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-prompt)] font-bold text-white text-2xl">80-99%</p>
                <p className="text-[#5A5A5A] text-xs font-[family-name:var(--font-sarabun)]">เกรดสภาพสินค้า</p>
              </div>
            </div>
          </div>

          {/* Right — Grade system display */}
          <div className="hidden lg:flex flex-col gap-3">
            <p className="text-[#5A5A5A] text-xs font-[family-name:var(--font-sarabun)] uppercase tracking-widest mb-2">
              ระบบเกรดสภาพสินค้า RPSZZ
            </p>
            {[
              { pct: 99, label: 'Like New', desc: 'สภาพเหมือนใหม่ ไม่มีรอย' },
              { pct: 95, label: 'Excellent', desc: 'สภาพดีมาก รอยเล็กน้อย' },
              { pct: 90, label: 'Very Good', desc: 'สภาพดี ใช้งานได้ปกติ' },
              { pct: 85, label: 'Good', desc: 'สภาพดีทั่วไป มีรอยการใช้งาน' },
              { pct: 80, label: 'Fair', desc: 'สภาพพอใช้ ราคาคุ้มค่า' },
            ].map(({ pct, label, desc }) => (
              <div
                key={pct}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-14 text-center">
                  <span className="font-[family-name:var(--font-prompt)] font-bold text-white text-lg">{pct}%</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1.5 gap-2">
                    <p className="font-[family-name:var(--font-prompt)] font-semibold text-white text-sm">{label}</p>
                    <p className="text-[#5A5A5A] text-xs font-[family-name:var(--font-sarabun)] text-right">{desc}</p>
                  </div>
                  <div className="w-full h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: pct >= 99 ? '#FFFFFF' : pct >= 95 ? '#D9D9D9' : pct >= 90 ? '#A3A3A3' : pct >= 85 ? '#737373' : '#404040'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Search, title: 'ตรวจสอบก่อนขาย', desc: 'เช็คทุกจุดไม่มีปิดบัง' },
              { icon: Wrench, title: 'ซ่อมและทำความสะอาด', desc: 'พร้อมใช้งานทันที' },
              { icon: Percent, title: 'แจ้งสภาพจริงเป็น %', desc: 'โปร่งใสที่สุด' },
              { icon: Tag, title: 'ราคาคุ้มค่า', desc: 'ของดีไม่ต้องแพง' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center md:justify-center gap-3">
                <Icon className="w-5 h-5 text-[#5A5A5A] flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-[family-name:var(--font-prompt)] font-semibold text-white text-sm">{title}</p>
                  <p className="text-[#5A5A5A] text-xs font-[family-name:var(--font-sarabun)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
