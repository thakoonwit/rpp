"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImg from "@/components/ui/logo.png";

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/products", label: "สินค้าทั้งหมด" },
  { href: "/categories", label: "หมวดหมู่" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHomepage = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[200] transition-all duration-300",
        scrolled || !isHomepage
          ? "bg-white border-b border-[#E5E5E5] shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="RPSZZ หน้าแรก"
        >
          <Image
            src={logoImg}
            alt="RPSZZ Logo"
            className={cn(
              "h-8 w-auto object-contain transition-all duration-300",
              scrolled || !isHomepage ? "" : "brightness-0 invert"
            )}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-[family-name:var(--font-sarabun)] font-medium transition-all duration-200",
                pathname === link.href
                  ? scrolled || !isHomepage
                    ? "text-[#121212] bg-[#F8F8F8]"
                    : "text-white bg-white/10"
                  : scrolled || !isHomepage
                  ? "text-[#5A5A5A] hover:text-[#121212] hover:bg-[#F8F8F8]"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/products?search="
            aria-label="ค้นหาสินค้า"
            className={cn(
              "p-2 rounded-md transition-all duration-200",
              scrolled || !isHomepage
                ? "text-[#5A5A5A] hover:text-[#121212] hover:bg-[#F8F8F8]"
                : "text-white/80 hover:text-white hover:bg-white/10"
            )}
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-md transition-all duration-200",
              scrolled || !isHomepage
                ? "text-[#5A5A5A] hover:text-[#121212] hover:bg-[#F8F8F8]"
                : "text-white/80 hover:text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#E5E5E5]",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-3 rounded-md text-sm font-[family-name:var(--font-sarabun)] font-medium transition-colors duration-200",
                pathname === link.href
                  ? "text-[#121212] bg-[#F8F8F8] font-semibold"
                  : "text-[#5A5A5A] hover:text-[#121212] hover:bg-[#F8F8F8]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
