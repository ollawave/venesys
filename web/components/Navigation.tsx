"use client";

import { Locale, translations } from "@/i18n";
import { useState } from "react";

interface NavigationProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  isFirstSection?: boolean;
  currentSection?: number;
  onNavigate?: (sectionIndex: number) => void;
}

export default function Navigation({ locale, onLocaleChange, isFirstSection = true, currentSection = 0, onNavigate }: NavigationProps) {
  const t = translations[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, section: 0 },
    { label: t.nav.about, section: 1 },
    { label: t.nav.products, section: 2 },
    { label: t.nav.media, section: 3 },
    { label: t.nav.contact, section: 4 },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isFirstSection
        ? "bg-transparent"
        : "bg-black/75 backdrop-blur-sm border-b border-white/10"
    }`}>
      <div className="w-full px-6 md:px-16">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* 로고 */}
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.(0); }}>
            <img src="/images/img-logo.png" alt="VENESYS" className="h-6 md:h-8" />
          </a>

          {/* PC 메뉴 */}
          <div className="hidden md:flex items-center gap-20">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate?.(item.section); }}
                className={`text-[21px] font-light transition ${
                  currentSection === item.section ? "text-[#F8B62D]" : "text-white hover:text-[#F8B62D]"
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* 언어 선택 */}
            <div className="relative ml-4">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-white hover:text-[#F8B62D] transition"
              >
                <img src="/images/language.png" alt="" className="w-5 h-5" />
                <span className="text-[14px]">{t.nav.lang}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-black/90 border border-white/10 py-1 min-w-[100px]">
                  <button
                    onClick={() => { onLocaleChange("ko"); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[14px] transition ${locale === "ko" ? "text-[#F8B62D]" : "text-white hover:text-[#F8B62D]"}`}
                  >
                    한국어
                  </button>
                  <button
                    onClick={() => { onLocaleChange("en"); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[14px] transition ${locale === "en" ? "text-[#F8B62D]" : "text-white hover:text-[#F8B62D]"}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 모바일 햄버거 */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <a key={item.label} href="#"
                onClick={(e) => { e.preventDefault(); onNavigate?.(item.section); setIsOpen(false); }}
                className={`block text-[18px] font-light transition ${
                  currentSection === item.section ? "text-[#F8B62D]" : "text-white hover:text-[#F8B62D]"
                }`}>
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 pt-3 border-t border-white/10">
              <button onClick={() => { onLocaleChange("ko"); setIsOpen(false); }}
                className={`text-[14px] ${locale === "ko" ? "text-[#F8B62D]" : "text-white"}`}>한국어</button>
              <span className="text-white/20">|</span>
              <button onClick={() => { onLocaleChange("en"); setIsOpen(false); }}
                className={`text-[14px] ${locale === "en" ? "text-[#F8B62D]" : "text-white"}`}>English</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}