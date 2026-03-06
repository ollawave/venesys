"use client";

import { Locale } from "@/i18n";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const products = {
  ko: [
    {
      num: "01.",
      title: "올페이셜",
      tagline: "All-in-One Hybrid\nAnti-Aging Solution",
      desc: "페이스부터 바디까지 완성되는\n프리미엄 하이브리드\n안티에이징 솔루션",
      cta: "자세히보기",
    },
    {
      num: "02.",
      title: "올라 웨이브",
      tagline: "Next-Generation Microwave\nEnergy Technology",
      desc: "극초단파 기술과 Tron Digital\n방식을 적용한 정밀 제어 기반의\n차세대 마이크로웨이브 솔루션",
      cta: "자세히보기",
    },
    {
      num: "03.",
      title: "컴포멜로 베드",
      tagline: "Ultimate Comfort,\nPrecise Care",
      desc: "편안함과 안정성을 고려한\n프리미엄 진동베드\n시술 환경의 품격을 높여줍니다",
      cta: "자세히보기",
    },
  ],
  en: [
    {
      num: "01.",
      title: "All Facial",
      tagline: "All-in-One Hybrid\nAnti-Aging Solution",
      desc: "Premium hybrid anti-aging\nsolution from face to body",
      cta: "Learn More",
    },
    {
      num: "02.",
      title: "Ola Wave",
      tagline: "Next-Generation Microwave\nEnergy Technology",
      desc: "Next-gen microwave solution\nwith Tron Digital precision\ncontrol technology",
      cta: "Learn More",
    },
    {
      num: "03.",
      title: "Compomello Bed",
      tagline: "Ultimate Comfort,\nPrecise Care",
      desc: "Premium vibration bed\ndesigned for comfort\nand precise care",
      cta: "Learn More",
    },
  ],
};

export default function Products({ locale, isActive }: { locale: Locale; isActive?: boolean }) {
  const items = products[locale];
  const [hovered, setHovered] = useState<number>(0);
  const [animKey, setAnimKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);

  const ctaLinks = [
    { type: "url" as const, url: "https://www.ulfacial.com/" },
    { type: "url" as const, url: "https://www.ollawave.com/" },
    { type: "modal" as const },
  ];

  const handleCta = (index: number) => {
    const link = ctaLinks[index];
    if (link.type === "url") {
      window.open(link.url, "_blank", "noopener,noreferrer");
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isActive) {
      setAnimKey(0);
      const timer = setTimeout(() => setAnimKey((k) => k + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const bgImages = [
    "/images/products/bg-section02-01.png",
    "/images/products/bg-section02-02.png",
    "/images/products/bg-section02-03.png",
  ];

  const bgImagesMobile = [
    "/images/products/bg-section02-01-m.png",
    "/images/products/bg-section02-02-m.png",
    "/images/products/bg-section02-03-m.png",
  ];

  const renderItem = (item: typeof items[0], index: number, isItemActive: boolean) => (
    <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-8 lg:p-12">
      <div>
        <p key={`n-${animKey}-${index}`} className={`text-[16px] md:text-[20px] text-white mb-1 hidden md:block ${animKey > 0 ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: `${index * 100}ms` }}>{item.num}</p>
        <h3 key={`t-${animKey}-${index}`} className={`text-[28px] md:text-[40px] font-medium text-center md:text-left ${animKey > 0 ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ letterSpacing: "-1px", animationDelay: `${index * 100 + 150}ms` }}>
          {item.title}
        </h3>
      </div>
      <div className={`transition-all duration-500 mt-6 md:mt-10 ${isItemActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <div className="w-8 h-px bg-white/40 mb-4 md:mb-6 mx-auto md:mx-0" />
        <p className="text-[18px] md:text-[25px] font-medium leading-relaxed whitespace-pre-line mb-4 md:mb-6 text-center md:text-left">{item.tagline}</p>
        <p className="text-[14px] md:text-[25px] font-light text-white/60 leading-relaxed whitespace-pre-line mb-4 md:mb-8 text-center md:text-left">{item.desc}</p>
        <div className="text-center md:text-left">
          <button onClick={() => handleCta(index)} className="inline-block px-6 md:px-8 py-2 md:py-2.5 border border-white/30 text-[13px] md:text-[16px] font-bold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">{item.cta}</button>
        </div>
      </div>
    </div>
  );

  // 모바일: Swiper로 한 아이템씩
  if (isMobile) {
    return (
      <>
        <section className="relative h-full w-full bg-white text-white overflow-hidden">
          {bgImagesMobile.map((src, i) => (
            <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url(${src})`, opacity: hovered === i ? 1 : 0 }} />
          ))}
          <div className="absolute inset-0 transition-opacity duration-500" style={{ backgroundColor: `rgba(0,0,0,0.3)` }} />

          <Swiper
            ref={swiperRef}
            modules={[EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={600}
            className="h-full w-full relative z-10"
            onSlideChange={(swiper) => { setHovered(swiper.realIndex); setAnimKey((k) => k + 1); }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                {renderItem(item, index, hovered === index)}
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        {showModal && <ComfModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  // PC: 기존 3열 hover 방식
  return (
    <>
      <section className="relative h-full w-full flex flex-row bg-black text-white overflow-hidden">
        {bgImages.map((src, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url(${src})`, opacity: hovered === i ? 1 : 0 }} />
        ))}
        {items.map((item, index) => {
          const isItemActive = hovered === index;
          return (
            <div key={index} className="relative flex-1 h-full cursor-pointer z-10 transition-all duration-500" onMouseEnter={() => setHovered(index)}>
              <div className="absolute inset-0 transition-opacity duration-500" style={{ backgroundColor: `rgba(0,0,0,${isItemActive ? 0.2 : 0.58})` }} />
              {renderItem(item, index, isItemActive)}
            </div>
          );
        })}
      </section>
      {showModal && <ComfModal onClose={() => setShowModal(false)} />}
    </>
  );
}

function ComfModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="relative max-w-3xl w-[90%] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl hover:text-[#F8B62D] transition cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>
        <img
          src="/images/about/comf.jpeg"
          alt="Compomello Bed"
          className="w-full h-auto max-h-[85vh] object-contain"
        />
      </div>
    </div>,
    document.body
  );
}
