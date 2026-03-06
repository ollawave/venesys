import { Locale, translations } from "@/i18n";

export default function About({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const cta = locale === "ko" ? "자세히 보기" : "Learn More";

  return (
    <section className="relative h-full w-full flex flex-col md:flex-row bg-[#FFFCFC] overflow-hidden">
      {/* 왼쪽 텍스트 영역 */}
      <div className="h-1/2 md:h-full flex flex-col justify-center px-6 md:pl-16 md:pr-12 py-10 md:py-20 md:w-1/3">
        <p className="text-[36px] md:text-[70px] font-normal text-gray-900 mb-8 md:mb-16" style={{ letterSpacing: "-2px" }}>
          {t.about.label}
        </p>
        <h2
          className="text-[24px] md:text-[40px] font-semibold leading-tight text-gray-900 whitespace-pre-line mb-4 md:mb-8"
          style={{ letterSpacing: "-1.9px" }}
        >
          {t.about.title}
        </h2>
        <p
          className="text-[14px] md:text-[20px] font-light leading-[1.69] text-gray-600 mb-6 md:mb-12 whitespace-pre-line"
          style={{ letterSpacing: "-0.5px" }}
        >
          {t.about.desc}
        </p>
        <div>
          <a
            href="#"
            className="inline-block px-6 md:px-8 py-2 md:py-2.5 border border-gray-400 text-[14px] md:text-[16px] text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            {cta}
          </a>
        </div>
      </div>

      {/* 오른쪽 배경 이미지 */}
      <div
        className="h-1/2 md:h-full flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/about/bg_about.png)" }}
      />
    </section>
  );
}
