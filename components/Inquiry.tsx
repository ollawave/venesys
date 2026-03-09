"use client";

import { Locale, translations } from "@/i18n";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Inquiry({ locale, isActive }: { locale: Locale; isActive?: boolean }) {
  const t = translations[locale];
  const [agreed, setAgreed] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isActive && !hasAppeared) {
      setHasAppeared(true);
    }
  }, [isActive, hasAppeared]);
  const [formData, setFormData] = useState({
    name: "", email: "", country: "", phone: "", subject: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    try {
      const { error } = await supabase.from("inquiries").insert([{
        name: formData.name,
        email: formData.email,
        country: formData.country,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      }]);
      if (error) throw error;
      setFormData({ name: "", email: "", country: "", phone: "", subject: "", message: "" });
      setAgreed(false);
      alert(locale === "ko" ? "문의가 접수되었습니다." : "Your inquiry has been submitted.");
    } catch {
      alert(locale === "ko" ? "오류가 발생했습니다." : "An error occurred.");
    }
  };

  const inputClass = "w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border border-black text-[13px] md:text-sm text-black focus:outline-none focus:border-black transition placeholder:text-black";

  const privacyData = locale === "ko" ? {
    title: "개인정보 처리방침",
    col1: "수집항목",
    col1Val: "성함/휴대폰전화번호/이메일주소",
    col2: "수집목적",
    col2Val: "서비스 이용에 따른 고객문의, 불만처리, 요류 제출 등 민원 처리 및 결과 회신",
    col3: "보유 및 이용기간",
    col3Val: "문의 처리 후 5년간 보관",
  } : {
    title: "Privacy Policy",
    col1: "Collected Items",
    col1Val: "Name / Phone / Email",
    col2: "Purpose",
    col2Val: "Customer inquiry processing, complaint handling, and response",
    col3: "Retention Period",
    col3Val: "Retained for 5 years after inquiry processing",
  };

  return (
    <section className="relative h-full w-full flex flex-col justify-center bg-black text-white overflow-hidden px-4 md:px-16 py-6 md:py-12">
      {/* 상단 타이틀 */}
      <p className={`text-[28px] md:text-[70px] font-normal text-white mb-3 md:mb-6 ${hasAppeared ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ letterSpacing: "-2px", animationDelay: "0ms" }}>
        {t.inquiry.label}
      </p>

      {/* 하단 콘텐츠 */}
      <div className={`flex flex-col md:flex-row gap-2 ${hasAppeared ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
        {/* 왼쪽 - 이미지 배경 + 텍스트 */}
        <div className="w-full md:w-1/2 relative flex flex-col justify-end min-h-[150px] md:min-h-[200px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/inquiry/img-inquiry.png)" }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 p-4 md:p-10 flex flex-col justify-between h-full">
            <div className="flex-1 flex items-center">
              <div>
                <p className="text-[14px] md:text-[20px] font-light leading-[1.69] text-white">
                  {t.inquiry.desc.split("\n").map((line, i) => (
                    <span key={i}>{line}{i < t.inquiry.desc.split("\n").length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-[11px] md:text-[14px] text-white">
              <p>{t.inquiry.cs}</p>
              <p>{t.inquiry.email}</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 - 폼 */}
        <div className="w-full md:w-1/2 flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 h-full">
            <div className="grid grid-cols-2 gap-1">
              <input type="text" required placeholder={t.inquiry.name}
                className={inputClass} value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" required placeholder={t.inquiry.emailField}
                className={inputClass} value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <input type="text" required placeholder={t.inquiry.country}
                className={inputClass} value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
              <input type="tel" required placeholder={t.inquiry.phone}
                className={inputClass} value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <input type="text" required placeholder={t.inquiry.subject}
              className={inputClass} value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            <textarea placeholder={t.inquiry.message}
              className={`${inputClass} min-h-[60px] h-[15vh] md:h-[30vh] md:min-h-[100px] resize-none`}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })} />

            {/* 개인정보 처리방침 */}
            <div className="border border-black bg-white p-3 md:p-5">
              <p className="text-[11px] md:text-[13px] font-semibold text-black mb-2 md:mb-3">{privacyData.title}</p>
              <div className="space-y-1 md:space-y-1.5 text-[9px] md:text-[11px] text-black/60">
                <div className="flex gap-2 md:gap-4">
                  <span className="text-black/50 shrink-0 w-16 md:w-24">· {privacyData.col1}</span>
                  <span>{privacyData.col1Val}</span>
                </div>
                <div className="flex gap-2 md:gap-4">
                  <span className="text-black/50 shrink-0 w-16 md:w-24">· {privacyData.col2}</span>
                  <span>{privacyData.col2Val}</span>
                </div>
                <div className="flex gap-2 md:gap-4">
                  <span className="text-black/50 shrink-0 w-16 md:w-24">· {privacyData.col3}</span>
                  <span>{privacyData.col3Val}</span>
                </div>
              </div>
            </div>

            {/* 동의 체크박스 */}
            <label className="flex items-center gap-2 py-2 md:py-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#F8B62D]"
              />
              <span className="text-[10px] md:text-[13px] text-white/60">{t.inquiry.privacy}</span>
            </label>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={!agreed}
              className="w-full py-2.5 md:py-4 bg-[#F8B62D] text-black text-[13px] md:text-[16px] font-bold hover:bg-[#e5a628] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.inquiry.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}