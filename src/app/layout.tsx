import type { Metadata } from "next";
import { Prompt, Sarabun } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-prompt",
  display: "swap",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rpszz.com"
  ),
  title: {
    default: "RPSZZ — ของดี ไม่ต้องแพง",
    template: "%s | RPSZZ",
  },
  description:
    "RPSZZ ร้านสินค้ามือสองที่คัดเอง เช็คเอง ซ่อมเอง ขายเอง พร้อมแจ้งสภาพจริงทุกชิ้น ในราคาที่เข้าถึงได้",
  keywords: [
    "มือสอง",
    "second hand",
    "สินค้าคุณภาพ",
    "ราคาถูก",
    "RPSZZ",
    "ของดี",
  ],
  authors: [{ name: "RPSZZ" }],
  creator: "RPSZZ",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "RPSZZ",
    title: "RPSZZ — ของดี ไม่ต้องแพง",
    description:
      "คัดเอง เช็คเอง ซ่อมเอง ขายเอง พร้อมแจ้งสภาพจริงทุกชิ้น",
  },
  twitter: {
    card: "summary_large_image",
    title: "RPSZZ — ของดี ไม่ต้องแพง",
    description:
      "คัดเอง เช็คเอง ซ่อมเอง ขายเอง พร้อมแจ้งสภาพจริงทุกชิ้น",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} ${sarabun.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-sarabun)",
            },
          }}
        />
      </body>
    </html>
  );
}
