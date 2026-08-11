"use client";

import { Locale, translations } from "@/i18n";
import { useEffect, useState, useRef } from "react";

export default function Hero({ locale, isActive }: { locale: Locale; isActive?: boolean }) {
  const t = translations[locale];
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [animKey, setAnimKey] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const check = () => setIsMobile(media.matches);
    check();
    media.addEventListener("change", check);
    return () => media.removeEventListener("change", check);
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

    const tryPlay = () => {
      setVideoReady(true);
      void video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    if (video.readyState >= 2) tryPlay();
    else video.load();

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isActive) return;
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, [isActive, isMobile]);

  useEffect(() => {
    const resume = () => {
      const video = videoRef.current;
      if (!video) return;
      void video.play().catch(() => {});
      setVideoReady(true);
    };

    window.addEventListener("touchstart", resume, { once: true });
    window.addEventListener("click", resume, { once: true });
    return () => {
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("click", resume);
    };
  }, [isMobile]);

  const anim = () =>
    animKey > 0 ? "animate-fadeSlideUp" : "opacity-0";

  return (
    <section className="relative h-full w-full flex items-center justify-center bg-black text-white overflow-hidden">
      <video
        ref={videoRef}
        key={isMobile ? "mobile" : "pc"}
        className="absolute inset-0 w-full h-full object-cover scale-125"
        src={isMobile ? "/videos/bg_video_mob.mp4" : "/videos/bg_video_pc.mp4"}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden
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
