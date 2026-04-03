"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface FullPageScrollProps {
  children: React.ReactNode[];
  lastSectionAuto?: boolean;
  onSectionChange?: (index: number) => void;
  goToSection?: number | null;
}

export default function FullPageScroll({ children, lastSectionAuto = false, onSectionChange, goToSection }: FullPageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const totalSections = children.length;
  const lastIndex = totalSections - 1;

  useEffect(() => {
    const measure = () => {
      if (lastSectionAuto && footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [lastSectionAuto]);

  const scrollTo = useCallback((index: number) => {
    if (isAnimating || index < 0 || index >= totalSections) return;
    setIsAnimating(true);
    setCurrentSection(index);
    onSectionChange?.(index);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, totalSections, onSectionChange]);

  useEffect(() => {
    if (goToSection !== null && goToSection !== undefined && goToSection !== currentSection) {
      setIsAnimating(true);
      setCurrentSection(goToSection);
      onSectionChange?.(goToSection);
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [goToSection]);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;
      if (e.deltaY > 0) scrollTo(currentSection + 1);
      else if (e.deltaY < 0) scrollTo(currentSection - 1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollTo(currentSection + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollTo(currentSection - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) scrollTo(currentSection + 1);
        else scrollTo(currentSection - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, isAnimating, scrollTo]);

  const getTranslateY = () => {
    if (!lastSectionAuto || currentSection < lastIndex) {
      return currentSection * 100;
    }
    // 마지막(푸터) 섹션: 이전 섹션 위치 + 푸터 높이(px)만큼만 이동
    return (lastIndex - 1) * 100;
  };

  const getTranslateExtra = () => {
    if (lastSectionAuto && currentSection === lastIndex) {
      return footerHeight;
    }
    return 0;
  };

  const translateVh = getTranslateY();
  const translatePx = getTranslateExtra();
  const dotCount = lastSectionAuto ? totalSections - 1 : totalSections;

  return (
    <div className="fixed inset-x-0 top-0 overflow-hidden" style={{ height: "100dvh" }}>
      <div
        ref={containerRef}
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(calc(-${translateVh}dvh - ${translatePx}px))` }}
      >
        {children.map((child, index) => {
          const isLast = lastSectionAuto && index === lastIndex;
          if (isLast) {
            return (
              <div key={index} ref={footerRef} className="w-full">
                {child}
              </div>
            );
          }
          return (
            <div key={index} style={{ height: "100dvh" }} className="w-full">
              {child}
            </div>
          );
        })}
      </div>

      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3">
        {Array.from({ length: dotCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
