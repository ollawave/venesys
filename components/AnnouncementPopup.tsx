"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 500);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 transition-opacity duration-500 ease-in-out ${
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
