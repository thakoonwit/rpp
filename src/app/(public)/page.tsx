import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesSection } from "@/components/home/categories-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { SellCTA } from "@/components/home/sell-cta";

export const revalidate = 3600


export const metadata: Metadata = {
  title: "RPSZZ — ของดี ไม่ต้องแพง",
  description:
    "RPSZZ ร้านสินค้ามือสองคุณภาพดี พร้อมแจ้งสภาพจริงทุกชิ้น ในราคาที่เข้าถึงได้",
  openGraph: {
    title: "RPSZZ — ของดี ไม่ต้องแพง",
    description: "ร้านสินค้ามือสองคุณภาพดี พร้อมแจ้งสภาพจริงทุกชิ้น",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <WhyChooseUs />
      <SellCTA />
    </>
  );
}
