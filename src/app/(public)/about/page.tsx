import type { Metadata } from 'next'
import { CheckCircle, Wrench, Star, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description: 'RPSZZ ร้านสินค้ามือสองคุณภาพดี พร้อมแจ้งสภาพจริงในราคาที่คุ้มค่า',
}

const GRADES = [
  { pct: 99, label: 'Like New', desc: 'สภาพเหมือนใหม่ ไม่มีรอยใดๆ ที่สังเกตได้' },
  { pct: 95, label: 'Excellent', desc: 'สภาพดีมาก อาจมีรอยเล็กน้อยที่ต้องดูใกล้ๆ จึงเห็น' },
  { pct: 90, label: 'Very Good', desc: 'สภาพดีทั่วไป ใช้งานได้ปกติ มีรอยการใช้งานบ้าง' },
  { pct: 85, label: 'Good', desc: 'สภาพดีทั่วไป เห็นรอยการใช้งานชัดเจน' },
  { pct: 80, label: 'Fair', desc: 'สภาพพอใช้งานได้ ราคาคุ้มค่าที่สุด' },
]

function getGradeBadgeStyle(pct: number): string {
  if (pct >= 99) return 'bg-[#121212] text-white border-[#121212]'
  if (pct >= 95) return 'bg-[#2A2A2A] text-white border-[#2A2A2A]'
  if (pct >= 90) return 'bg-[#5A5A5A] text-white border-[#5A5A5A]'
  if (pct >= 85) return 'bg-[#D9D9D9] text-[#121212] border-[#D9D9D9]'
  return 'bg-[#F5F5F5] text-[#5A5A5A] border-[#E5E5E5]'
}

function getGradeBarStyle(pct: number): string {
  if (pct >= 99) return 'bg-[#121212]'
  if (pct >= 95) return 'bg-[#2A2A2A]'
  if (pct >= 90) return 'bg-[#5A5A5A]'
  if (pct >= 85) return 'bg-[#D9D9D9]'
  return 'bg-[#C0C0C0]'
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#121212] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-[family-name:var(--font-prompt)] font-bold text-4xl tracking-widest text-white mb-4">
            RPSZZ
          </div>
          <h1 className="font-[family-name:var(--font-prompt)] font-bold text-white text-3xl md:text-4xl mb-4">
            เกี่ยวกับเรา
          </h1>
          <p className="!text-[#D9D9D9] font-[family-name:var(--font-sarabun)] text-lg leading-relaxed max-w-2xl mx-auto">
            RPSZZ คือร้านสินค้ามือสองที่เชื่อว่าของมือสองยังมีคุณค่า
            และพร้อมแจ้งสภาพจริงทุกชิ้นให้คุณทราบก่อนตัดสินใจ
          </p>
        </div>
      </div>

      {/* Process */}
      <div id="process" className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl md:text-3xl text-center mb-12">
            กระบวนการของเรา
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: <CheckCircle className="w-6 h-6 text-[#121212]" />,
                step: '1',
                title: 'คัดสรรหาสินค้า',
                desc: 'คัดเฉพาะสินค้าที่มีคุณภาพดีและคุ้มค่า ไม่รับทุกอย่าง',
              },
              {
                icon: <Shield className="w-6 h-6 text-[#121212]" />,
                step: '2',
                title: 'ตรวจสอบอย่างละเอียด',
                desc: 'ทีมงานตรวจสอบทุกส่วน บันทึกสภาพอย่างตรงไปตรงมา',
              },
              {
                icon: <Wrench className="w-6 h-6 text-[#121212]" />,
                step: '3',
                title: 'ซ่อมและทำความสะอาด',
                desc: 'แก้ไขและทำความสะอาดให้พร้อมใช้งาน เหมือนใหม่ในราคามือสอง',
              },
              {
                icon: <Star className="w-6 h-6 text-[#121212]" />,
                step: '4',
                title: 'แจ้งเกรดและขาย',
                desc: 'ประเมินเป็นเปอร์เซ็นต์และตั้งราคาที่คุ้มค่าสำหรับผู้ซื้อ',
              },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="flex gap-4 p-6 rounded-xl border border-[#E5E5E5]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-base mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade system */}
      <div id="grade-system" className="py-16 md:py-20 bg-[#F8F8F8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl md:text-3xl text-center mb-4">
            ระบบเกรดสภาพสินค้า
          </h2>
          <p className="text-center text-[#5A5A5A] font-[family-name:var(--font-sarabun)] text-sm mb-10">
            ประเมินจากการใช้งานจริงโดยทีมงาน RPSZZ
          </p>
          <div className="flex flex-col gap-3">
            {GRADES.map(({ pct, label, desc }) => (
              <div
                key={pct}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E5E5E5]"
              >
                <div className={cn("flex-shrink-0 w-16 text-center py-2 rounded-lg border font-[family-name:var(--font-prompt)] font-bold text-lg transition-colors duration-200", getGradeBadgeStyle(pct))}>
                  {pct}%
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <p className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-base truncate">{label}</p>
                  </div>
                  <p className="text-sm text-[#5A5A5A] font-[family-name:var(--font-sarabun)] mb-2.5">{desc}</p>
                  {/* Progress bar / หลอดพลัง */}
                  <div className="w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", getGradeBarStyle(pct))}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
