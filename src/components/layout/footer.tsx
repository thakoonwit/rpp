import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { Instagram } from "@/components/icons";
import Image from "next/image";
import logoImg from "@/components/ui/logo.png";


const footerLinks = {
  shop: [
    { href: "/products", label: "สินค้าทั้งหมด" },
    { href: "/categories", label: "หมวดหมู่สินค้า" },
    { href: "/products?featured=true", label: "สินค้าแนะนำ" },
    { href: "/products?status=sold", label: "สินค้าที่ขายแล้ว" },
  ],
  info: [
    { href: "/about", label: "เกี่ยวกับเรา" },
    { href: "/contact", label: "ติดต่อเรา" },
    { href: "/about#grade-system", label: "ระบบเกรดสินค้า" },
    { href: "/about#process", label: "กระบวนการตรวจสอบ" },
  ],
  categories: [
    { href: "/categories/smartphones", label: "มือถือ / แท็บเล็ต" },
    { href: "/categories/laptops", label: "โน้ตบุ๊ค" },
    { href: "/categories/cameras", label: "กล้อง / เลนส์" },
    { href: "/categories/watches", label: "นาฬิกา" },
    { href: "/categories/shoes", label: "รองเท้า" },
    { href: "/categories/accessories", label: "กระเป๋า / แอคเซสเซอรี่" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3">
              <Image
                src={logoImg}
                alt="RPSZZ Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[#D9D9D9] text-sm font-[family-name:var(--font-sarabun)] mb-1">
              ของดี ไม่ต้องแพง
            </p>
            <p className="text-[#5A5A5A] text-xs font-[family-name:var(--font-sarabun)] mb-6 leading-relaxed">
              ของดีไม่ต้องแพง พร้อมแจ้งสภาพจริงทุกชิ้น
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:0801234567"
                className="flex items-center gap-2 text-sm text-[#D9D9D9] hover:text-white transition-colors duration-200 font-[family-name:var(--font-sarabun)]"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-[#5A5A5A]" />
                080-123-4567
              </a>
              <a
                href="https://instagram.com/rpszz_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#D9D9D9] hover:text-white transition-colors duration-200 font-[family-name:var(--font-sarabun)]"
              >
                <Instagram className="w-4 h-4 flex-shrink-0 text-[#5A5A5A]" />
                @rpszz_official
              </a>
              <div className="flex items-start gap-2 text-sm text-[#D9D9D9] font-[family-name:var(--font-sarabun)]">
                <Clock className="w-4 h-4 flex-shrink-0 text-[#5A5A5A] mt-0.5" />
                <span>จันทร์ - อาทิตย์ 10:00 – 20:00 น.</span>
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-[family-name:var(--font-prompt)] font-semibold text-sm text-white mb-4">
              ร้านค้า
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] hover:text-white transition-colors duration-200 font-[family-name:var(--font-sarabun)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="font-[family-name:var(--font-prompt)] font-semibold text-sm text-white mb-4">
              บริการและข้อมูล
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] hover:text-white transition-colors duration-200 font-[family-name:var(--font-sarabun)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category links */}
          <div>
            <h3 className="font-[family-name:var(--font-prompt)] font-semibold text-sm text-white mb-4">
              หมวดหมู่สินค้า
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] hover:text-white transition-colors duration-200 font-[family-name:var(--font-sarabun)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2A2A] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#5A5A5A] font-[family-name:var(--font-sarabun)] text-center sm:text-left">
            © {new Date().getFullYear()} RPSZZ. สงวนลิขสิทธิ์ทุกอย่าง
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-[#5A5A5A] font-[family-name:var(--font-sarabun)]">
              ของดี ไม่ต้องแพง
            </p>
            <span className="text-[#2A2A2A] text-xs">|</span>
            <p className="text-xs text-[#5A5A5A] font-[family-name:var(--font-sarabun)]">
              Powered by{' '}
              <a
                href="https://uwaver.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-white underline underline-offset-2 transition-colors duration-200"
              >
                Uwaver
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
