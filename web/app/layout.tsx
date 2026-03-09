import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VENSYS | 피부미용 의료기기 전문 제조 | (주)베네시스 Vensys Co., Ltd.",
  description: "(주)베네시스(VENSYS)는 첨단 피부미용 의료기기 연구, 개발, 제조 전문 기업입니다. 글로벌 품질 기준을 준수한 혁신 솔루션으로 클리닉 및 피부미용 전문가에게 신뢰받는 제품을 제공합니다.",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "VENSYS | 피부미용 의료기기 전문 제조 | (주)베네시스",
    description: "(주)베네시스(VENSYS)는 첨단 피부미용 의료기기 연구, 개발, 제조 전문 기업입니다.",
    images: [{ url: "/images/og-img.png", width: 1200, height: 630 }],
  },
  verification: {
    other: {
      "naver-site-verification": "0147b39a2c18eed06eaa5b2648bdc281fa54c4a5",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
