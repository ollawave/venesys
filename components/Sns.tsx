"use client";

import { Locale, translations } from "@/i18n";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import type { SwiperClass } from "swiper/react";
import "swiper/css";

export default function Sns({ locale, isActive }: { locale: Locale; isActive?: boolean }) {
  const t = translations[locale];
  const [progress, setProgress] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setAnimKey(0);
      const timer = setTimeout(() => setAnimKey((k) => k + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const items = [
    { id: 1, image: "/images/social/img-sns01.png" },
    { id: 2, image: "/images/social/img-sns02.png" },
    { id: 3, image: "/images/social/img-sns03.png" },
    { id: 4, image: "/images/social/img-sns04.png" },
  ];

  const handleProgress = (swiper: SwiperClass) => {
    setProgress(swiper.progress);
  };

  return (
    <section className="relative h-full w-full flex items-center bg-[#494949]/80 text-white overflow-hidden">
      <div className="w-full">
        <div className="mb-6 md:mb-12 px-6 md:px-16">
          <h2 key={`sh-${animKey}`} className={`text-[28px] md:text-[70px] font-normal mb-3 md:mb-6 ${animKey > 0 ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ letterSpacing: "-1.9px", animationDelay: "0ms" }}>
            {t.sns.label}
          </h2>
          <p key={`sp-${animKey}`} className={`text-[13px] md:text-lg font-light text-white/80 ${animKey > 0 ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ letterSpacing: "-1.1px", animationDelay: "200ms" }}>
            {t.sns.desc}
          </p>
        </div>

        <div key={`sw-${animKey}`} className={`pl-6 md:pl-16 ${animKey > 0 ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
          <Swiper
            spaceBetween={20}
            slidesPerView={1.8}
            slidesOffsetAfter={24}
            breakpoints={{
              640: { slidesPerView: 2.8, spaceBetween: 40, slidesOffsetAfter: 40 },
              1024: { slidesPerView: 3.8, spaceBetween: 84, slidesOffsetAfter: 64 },
            }}
            onProgress={handleProgress}
            onSlideChange={(swiper) => setProgress(swiper.progress)}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative aspect-square bg-white/10 overflow-hidden cursor-pointer">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-6 md:mt-8 mx-6 md:mx-16 h-[2px] bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F8B62D] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.max(progress * 100, 5)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
