"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ImageModal({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 px-4 transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-w-3xl w-full max-h-[85vh] transition-all duration-500 ease-in-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 hover:opacity-80 transition cursor-pointer"
          aria-label="닫기"
        >
          <img src="/images/close.png" alt="" className="w-4 h-4" />
        </button>
        <img
          src="/images/20260811.png"
          alt="신주식 발행 공고"
          className="w-full h-auto max-h-[85vh] object-contain"
        />
      </div>
    </div>,
    document.body
  );
}

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 500);
  };

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-6 transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-[260px] bg-black px-4 py-10 md:px-4 md:py-14 text-white text-center transition-all duration-500 ease-in-out border-1 border-white ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 hover:opacity-80 transition cursor-pointer"
          aria-label="닫기"
        >
          <img src="/images/close.png" alt="" className="w-4 h-4" />
        </button>

        <h2 className="text-[26px] font-semibold mb-8 md:mb-10 tracking-tight">
          신주식 발행공고
        </h2>

        <div className="leading-relaxed text-left px-6 pr-4">
          <p className="text-[17px]">제목: 신주식  발행 공고</p>
          <p className="text-[17px]">작성자: VENESYS</p>
          <p className="text-[17px]">작성일: 2026년 8월 11일</p>
          <p className="pt-4 md:pt-6 text-center pr-2">
            <button
              type="button"
              onClick={() => setShowImage(true)}
              className="inline-block w-full mx-auto px-6 py-2.5 border border-white text-[14px] md:text-[16px] font-medium hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
            >
              자세히 보기
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body
      )}
      {showImage && <ImageModal onClose={() => setShowImage(false)} />}
    </>
  );
}
