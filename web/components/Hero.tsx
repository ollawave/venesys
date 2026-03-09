"use client";

import { Locale, translations } from "@/i18n";
import { useEffect, useState, useRef } from "react";

export default function Hero({ locale, isActive }: { locale: Locale; isActive?: boolean }) {
  const t = translations[locale];
  const [isMobile, setIsMobile] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // 영상 미리 로드 후 fade-in
  useEffect(() => {
    setVideoReady(false);
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setVideoReady(true);
    video.addEventListener("canplaythrough", onCanPlay);
    // 이미 로드된 경우
    if (video.readyState >= 4) setVideoReady(true);
    return () => video.removeEventListener("canplaythrough", onCanPlay);
  }, [isMobile]);

  const anim = () =>
    animKey > 0 ? "animate-fadeSlideUp" : "opacity-0";

  return (
    <section className="relative h-full w-full flex items-center justify-center bg-black text-white overflow-hidden">
      <video
        ref={videoRef}
        key={isMobile ? "mobile" : "pc"}
        className={`absolute inset-0 w-full h-full object-cover scale-125 transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        src={isMobile ? "/videos/bg_video_mob.mp4" : "/videos/bg_video_pc.mp4"}
        preload="auto"
        autoPlay muted loop playsInline
      />
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
