import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VENESYS | 피부미용 의료기기 전문 제조 | (주)베네시스 Venesys Co., Ltd.",
  description: "(주)베네시스(VENESYS)는 첨단 피부미용 의료기기 연구, 개발, 제조 전문 기업입니다. 울페이셜, 올라웨이브, 컴포멜로 베드 등 글로벌 품질 기준을 준수한 혁신 솔루션으로 클리닉 및 피부미용 전문가에게 신뢰받는 제품을 제공합니다.",
  keywords: ["베네시스", "VENESYS", "피부미용 의료기기", "울페이셜", "ULFACIAL", "올라웨이브", "OLLA Wave", "컴포멜로 베드", "COMFOMELLO BED", "미용의료기기", "에스테틱", "안티에이징", "피부관리기기", "메디컬 디바이스"],
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "VENESYS | 피부미용 의료기기 전문 제조 | (주)베네시스",
    description: "(주)베네시스(VENESYS)는 첨단 피부미용 의료기기 연구, 개발, 제조 전문 기업입니다. 울페이셜, 올라웨이브, 컴포멜로 베드 등 프리미엄 솔루션을 제공합니다.",
    images: [{ url: "/images/og-img.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ko_KR",
    siteName: "VENESYS",
  },
  twitter: {
    card: "summary_large_image",
    title: "VENESYS | 피부미용 의료기기 전문 제조",
    description: "(주)베네시스(VENESYS)는 첨단 피부미용 의료기기 연구, 개발, 제조 전문 기업입니다.",
    images: ["/images/og-img.png"],
  },
  verification: {
    other: {
      "naver-site-verification": ["0147b39a2c18eed06eaa5b2648bdc281fa54c4a5", "51dc55c342c0081c81671f5941fae0b5bd173c68"],
    },
  },
  alternates: {
    canonical: "https://venesys.co.kr",
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
