import { Locale, translations } from "@/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = translations[locale];

  return (
    <footer className="bg-[#1a1a1a] text-white w-full py-8 md:py-14">
      <div className="w-full px-4 md:px-16 flex flex-col md:flex-row justify-between gap-6 md:gap-8">
        {/* 왼쪽 - 로고 + 회사명 + 카피라이트 + SNS */}
        <div>
          <img src="/images/ft-logo.png" alt="VENESYS" className="h-6 md:h-7 mb-3" />
          <p className="text-[13px] text-white mb-1">{t.footer.company}</p>
          <p className="text-[12px] text-white/60 mb-5">{t.footer.copyright}</p>
          {/* SNS 아이콘 */}
          <div className="flex items-center gap-3">
            <a href="https://www.youtube.com/@VENESYS-Corp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition">
              <img src="/images/social/img-youtube.png" alt="YouTube" className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/venesys.corp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition">
              <img src="/images/social/img-insta.png" alt="Instagram" className="w-4 h-4" />
            </a>
            <a href="https://pf.kakao.com/_GSIAX" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition">
              <img src="/images/social/img-kakao.png" alt="Kakao" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 오른쪽 - 정보 */}
        <div className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-12 gap-y-3 md:gap-y-4 text-[12px] md:text-[13px]">
          <p className="text-white">{t.footer.bizNum}</p>
          <p className="text-white">{t.footer.bizNumVal}</p>

          <p className="text-white">{t.footer.contact}</p>
          <div className="text-white leading-relaxed">
            <p>{t.footer.contactEmail}</p>
            <p>{t.footer.contactTel}</p>
            <p>{t.footer.contactMobile}</p>
          </div>

          <p className="text-white">{t.footer.privacy}</p>
          <p className="text-white">{t.footer.privacyVal}</p>
        </div>
      </div>
    </footer>
  );
}
