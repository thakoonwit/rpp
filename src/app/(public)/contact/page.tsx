import type { Metadata } from 'next'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import { Instagram } from '@/components/icons'


export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อ RPSZZ สอบถามสินค้าหรือนัดดูสินค้าได้เลย',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#121212] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-prompt)] font-bold text-white text-3xl md:text-4xl mb-4">
            ติดต่อเรา
          </h1>
          <p className="text-[#888] font-[family-name:var(--font-sarabun)] text-base">
            สอบถามสินค้า หรืออยากทราบราคาซื้อ-ขาย? ติดต่อได้เลย
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <h2 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl mb-8">
              ช่องทางติดต่อ
            </h2>
            <div className="flex flex-col gap-5">
              {
                [
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: 'โทรศัพท์',
                    value: '080-123-4567',
                    href: 'tel:0801234567',
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: 'อีเมล',
                    value: 'contact@rpszz.com',
                    href: 'mailto:contact@rpszz.com',
                  },
                  {
                    icon: <Instagram className="w-5 h-5" />,
                    label: 'Instagram',
                    value: '@rpszz_official',
                    href: 'https://instagram.com/rpszz_official',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    label: 'เวลาทำการ',
                    value: 'จันทร์ – อาทิตย์ 10:00 – 20:00 น.',
                    href: null,
                  },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl border border-[#E5E5E5]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center text-[#5A5A5A]">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)] mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-[family-name:var(--font-sarabun)] font-medium text-[#121212] hover:text-[#5A5A5A] transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-[family-name:var(--font-sarabun)] font-medium text-[#121212]">{value}</p>
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Sell your stuff */}
          <div>
            <h2 className="font-[family-name:var(--font-prompt)] font-bold text-[#121212] text-2xl mb-8">
              อยากขายกับเรา?
            </h2>
            <div className="bg-[#F8F8F8] rounded-2xl p-6">
              <p className="font-[family-name:var(--font-sarabun)] text-[#5A5A5A] text-sm leading-relaxed mb-4">
                เราซื้อสินค้ามือสองหลากหลายประเภท
                ประเมินราคาฟรีไม่มีค่าใช้จ่าย
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm font-[family-name:var(--font-sarabun)] mb-4">
                {['📱 มือถือ / แท็บ', '💻 โน้ตบุ๊ค', '📷 กล้อง / เลนส์', '⌚ นาฬิกา', '👟 รองเท้า', '👜 กระเป๋า / เครื่องไฟฟ้า'].map((item) => (
                  <div key={item} className="p-2 bg-white rounded-lg text-[#5A5A5A] text-xs">{item}</div>
                ))}
              </div>
              <a
                href="tel:0801234567"
                className="inline-flex w-full justify-center items-center gap-2 h-11 px-6 bg-[#121212] text-white rounded-lg font-[family-name:var(--font-prompt)] font-semibold text-sm hover:bg-[#2A2A2A] transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                โทรสอบถามเลย
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
