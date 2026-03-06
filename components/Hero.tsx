"use client";

import { Locale, translations } from "@/i18n";
import { useEffect, useState } from "react";

export default function Hero({ locale, isActive }: { locale: Locale; isActive?: boolean }) {
  const t = translations[locale];
  const [isMobile, setIsMobile] = useState(false);
  const [animKey, setAnimKey] = useState(0);

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

  const anim = () =>
    animKey > 0 ? "animate-fadeSlideUp" : "opacity-0";

  return (
    <section className="relative h-full w-full flex items-center justify-center bg-black text-white overflow-hidden">
      <video
        key={isMobile ? "mobile" : "pc"}
        className="absolute inset-0 w-full h-full object-cover scale-125"
        src={isMobile ? "/videos/bg_video_mob.mp4" : "/videos/bg_video_pc.mp4"}
        autoPlay muted loop playsInline
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 text-center px-6 md:px-16 w-full">
        <h1
          key={`h-${animKey}`}
          className={`text-[22px] md:text-[38px] font-semibold mb-3 md:mb-8 leading-normal ${anim()}`}
          style={{ letterSpacing: "-1.9px", animationDelay: "0ms" }}
        >
          {t.hero.title}<br />{t.hero.subtitle}
        </h1>
        <p
          key={`p-${animKey}`}
          className={`hidden md:block text-[22px] font-light leading-[1.69] max-w-2xl mx-auto text-white/85 whitespace-pre-line ${anim()}`}
          style={{ letterSpacing: "-1.1px", animationDelay: "200ms" }}
        >
          {t.hero.desc}
        </p>
      </div>
    </section>
  );
}
