"use client";

import { useEffect, useState } from "react";
import { Locale } from "@/i18n";
import FullPageScroll from "@/components/FullPageScroll";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Business from "@/components/Business";
import Sns from "@/components/Sns";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [currentSection, setCurrentSection] = useState(0);
  const [goToSection, setGoToSection] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleNavigate = (sectionIndex: number) => {
    setGoToSection(null);
    setTimeout(() => setGoToSection(sectionIndex), 0);
  };

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("locale") as Locale;
    if (saved) {
      setLocale(saved);
    } else {
      const lang = navigator.language.startsWith("ko") ? "ko" : "en";
      setLocale(lang);
      localStorage.setItem("locale", lang);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  if (!mounted) return null;

  return (
    <>
      <Navigation locale={locale} onLocaleChange={changeLocale} isFirstSection={currentSection === 0} currentSection={currentSection} onNavigate={handleNavigate} />
      <FullPageScroll lastSectionAuto onSectionChange={setCurrentSection} goToSection={goToSection}>
        <Hero locale={locale} isActive={currentSection === 0} />
        <Business locale={locale} isActive={currentSection === 1} />
        <Products locale={locale} isActive={currentSection === 2} />
        <Sns locale={locale} isActive={currentSection === 3} />
        <Inquiry locale={locale} isActive={currentSection === 4} />
        <Footer locale={locale} />
      </FullPageScroll>
    </>
  );
}
