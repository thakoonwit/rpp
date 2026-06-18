'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const navItems = [
  { href: '/administrator', label: 'ดาชบอร์ด', icon: LayoutDashboard },
  { href: '/administrator/products', label: 'สินค้า', icon: Package },
  { href: '/administrator/categories', label: 'หมวดหมู่', icon: FolderOpen },
  { href: '/administrator/orders', label: 'คำสั่งซื้อ', icon: ShoppingCart },
  { href: '/administrator/customers', label: 'ลูกค้า', icon: Users },
  { href: '/administrator/settings', label: 'ตั้งค่าเว็บ', icon: Settings },
]

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    toast.success('ออกจากระบบแล้ว')
    router.push('/administrator/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#E5E5E5]">
        <Link
          href="/"
          className="font-[family-name:var(--font-prompt)] font-bold text-xl tracking-widest text-[#121212]"
        >
          RPSZZ
        </Link>
        <p className="text-xs text-[#888] font-[family-name:var(--font-sarabun)] mt-0.5">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        <ul className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === '/administrator'
                ? pathname === '/administrator'
                : pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[family-name:var(--font-sarabun)] font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-[#121212] text-white'
                      : 'text-[#5A5A5A] hover:text-[#121212] hover:bg-[#F0F0F0]'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User + logout */}
      <div className="p-4 border-t border-[#E5E5E5]">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#121212] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {userEmail[0]?.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-[#5A5A5A] font-[family-name:var(--font-sarabun)] truncate">
            {userEmail}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[family-name:var(--font-sarabun)] font-medium text-[#5A5A5A] hover:text-red-600 hover:bg-red-50 transition-colors duration-200 w-full"
        >
          <LogOut className="w-4 h-4" />
          ออกจากระบบ
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-[#E5E5E5] flex-shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[200] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 h-14">
        <Link
          href="/administrator"
          className="font-[family-name:var(--font-prompt)] font-bold text-lg tracking-widest text-[#121212]"
        >
          RPSZZ
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#5A5A5A] hover:text-[#121212]"
          aria-label="เปิดเมนู"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[199] bg-black/40" onClick={() => setMobileOpen(false)}>
          <aside
            className="absolute left-0 top-14 bottom-0 w-60 bg-white border-r border-[#E5E5E5]"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
