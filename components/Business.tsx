"use client";

import { Locale } from "@/i18n";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const aboutItems = {
  ko: [
    {
      label: "ABOUT US",
      labelColor: "#0044B9",
      category: "",
      tagline: "더 나은 피부 건강을 위한\n혁신 솔루션의 기준",
      desc: "베네시스는 정교한 기술과 미학을 바탕으로\n끊임없는 혁신을 통해 피부 미용 의료기기의\n새로운 기준을 만들어갑니다.",
      image: "/images/about/img-about01.png",
    },
    {
      label: "MEDICAL",
      labelColor: "#00BEE2",
      category: "병원용 의료기기",
      tagline: "Medical-Grade\nDevices",
      desc: "임상 전문성과 기술력을 바탕으로 안전성과 효과를 고려한\n피부미용 의료기기를 연구하고 개발합니다.\n전문가를 위한 신뢰도 높은 메디컬 솔루션을 제공합니다.",
      image: "/images/about/img-about02.png",
    },
    {
      label: "AESTHETIC",
      labelColor: "#F8CC04",
      category: "미용 기기",
      tagline: "Professional\nAesthetic Devices",
      desc: "시술 환경과 사용자 편의성을 고려한 정교한 설계를 바탕으로\n전문적인 에스테틱 케어까지 폭넓게 대응합니다.\n안정적인 성능과 효율성을 갖춘 피부 미용기기를 제공합니다.",
      image: "/images/about/img-about03.png",
    },
    {
      label: "COSMETIC",
      labelColor: "#428EFF",
      category: "병원용 코스메틱",
      tagline: "Dermatological\nCosmetic Solutions",
      desc: "피부 과학을 기반으로 한 포뮬러로\n피부 본연의 건강을 고려한 코스메틱을 개발합니다.\n기기와 시너지를 이루는 토탈 케어 솔루션을 제안합니다.",
      image: "/images/about/img-about04.png",
    },
  ],
  en: [
    {
      label: "ABOUT US",
      labelColor: "#0044B9",
      category: "",
      tagline: "The Standard of Innovation\nfor Better Skin Health",
      desc: "VENESYS sets new standards in aesthetic\nmedical devices through relentless innovation,\nbuilt on precision technology and aesthetics.",
      image: "/images/about/img-about01.png",
    },
    {
      label: "MEDICAL",
      labelColor: "#00BEE2",
      category: "Medical-Grade Aesthetic Devices",
      tagline: "Medical-Grade\nDevices",
      desc: "We research and develop aesthetic medical devices\nthat prioritize safety and efficacy.\nReliable medical solutions for professionals.",
      image: "/images/about/img-about02.png",
    },
    {
      label: "AESTHETIC",
      labelColor: "#F8CC04",
      category: "Professional Aesthetic Devices",
      tagline: "Professional\nAesthetic Devices",
      desc: "High-performance aesthetic devices for skincare\nand esthetic professionals.\nPractical, field-tested solutions.",
      image: "/images/about/img-about03.png",
    },
    {
      label: "COSMETIC",
      labelColor: "#428EFF",
      category: "Dermatological Cosmetics",
      tagline: "Dermatological\nCosmetic Solutions",
      desc: "Specialized cosmetics grounded in dermatological science.\nTrusted product lines for medical professionals.",
      image: "/images/about/img-about04.png",
    },
  ],
};

export default function Business({ locale, isActive }: { locale: Locale; isActive?: boolean }) {
  const items = aboutItems[locale];
  const swiperRef = useRef<SwiperRef>(null);
  const rightSwiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goPrev = () => {
    swiperRef.current?.swiper.slidePrev();
    rightSwiperRef.current?.swiper.slidePrev();
  };

  const goNext = () => {
    swiperRef.current?.swiper.slideNext();
    rightSwiperRef.current?.swiper.slideNext();
  };

  const handleSlideChange = () => {
    const idx = swiperRef.current?.swiper.realIndex ?? 0;
    setActiveIndex(idx);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    if (isActive) {
      // 섹션 진입 시 텍스트를 먼저 숨기고, 짧은 딜레이 후 애니메이션 시작
      setAnimKey(0);
      const timer = setTimeout(() => {
        setAnimKey((k) => k + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <section className="relative h-full w-full flex flex-col md:flex-row overflow-hidden">
      {/* 왼쪽 - 흰색 배경 + 원형 그래픽 + 텍스트 슬라이드 */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-white">
        {/* 원형 배경 이미지 */}
        {/* 원형 배경 이미지 - 모바일에서는 작게 */}
        <div
          className="absolute inset-0 bg-no-repeat pointer-events-none md:hidden"
          style={{ backgroundImage: "url(/images/about/bg-about.png)", backgroundPosition: "-15% center", backgroundSize: "400px auto" }}
        />
        <div
          className="absolute inset-0 bg-no-repeat pointer-events-none hidden md:block"
          style={{ backgroundImage: "url(/images/about/bg-about.png)", backgroundPosition: "-15% center", backgroundSize: "800px auto" }}
        />

        <Swiper
          ref={swiperRef}
          modules={[Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          loop
          className="h-full w-full"
          onSlideChangeTransitionStart={handleSlideChange}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:pl-16 md:pr-12 py-6 md:py-20">
                <p
                  key={`label-${animKey}-${index}`}
                  className={`text-[28px] md:text-[70px] font-normal mb-3 md:mb-40 ${animKey > 0 && activeIndex === index ? "animate-fadeSlideUp" : "opacity-0"}`}
                  style={{ letterSpacing: "-2px", color: item.labelColor, animationDelay: "0ms" }}
                >
                  {item.label}
                </p>
                {item.category && (
                  <p
                    key={`cat-${animKey}-${index}`}
                    className={`text-[14px] md:text-[40px] text-gray-900 mb-1 md:mb-2 ${animKey > 0 && activeIndex === index ? "animate-fadeSlideUp" : "opacity-0"}`}
                    style={{ animationDelay: "100ms" }}
                  >
                    {item.category}
                  </p>
                )}
                <h3
                  key={`tag-${animKey}-${index}`}
                  className={`text-[18px] md:text-[40px] font-medium leading-tight whitespace-pre-line text-gray-900 mb-2 md:mb-20 ${animKey > 0 && activeIndex === index ? "animate-fadeSlideUp" : "opacity-0"}`}
                  style={{ letterSpacing: "-1px", animationDelay: "200ms" }}
                >
                  {item.tagline}
                </h3>
                <p
                  key={`desc-${animKey}-${index}`}
                  className={`text-[12px] md:text-[20px] font-light leading-[1.69] text-[#1E1E1E] whitespace-pre-line ${animKey > 0 && activeIndex === index ? "animate-fadeSlideUp" : "opacity-0"}`}
                  style={{ animationDelay: "350ms" }}
                >
                  {item.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 화살표 네비게이션 */}
        <div className="absolute bottom-0 left-0 md:left-full md:bottom-10 z-20 hidden md:flex items-center gap-0">
          <button
            onClick={goPrev}
            className="w-10 h-10 bg-[#4B4B4B] hover:bg-black flex items-center justify-center transition cursor-pointer"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="w-10 h-10 bg-[#4B4B4B] hover:bg-black flex items-center justify-center transition cursor-pointer"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 오른쪽 - 이미지 슬라이드 */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
        <Swiper
          ref={rightSwiperRef}
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          loop
          className="h-full w-full"
          allowTouchMove={false}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 모바일 화살표 - 이미지 영역 좌측 하단 */}
        <div className="absolute bottom-0 left-0 z-20 flex items-center gap-0 md:hidden">
          <button
            onClick={goPrev}
            className="w-10 h-10 bg-[#4B4B4B] hover:bg-black flex items-center justify-center transition cursor-pointer"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="w-10 h-10 bg-[#4B4B4B] hover:bg-black flex items-center justify-center transition cursor-pointer"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}