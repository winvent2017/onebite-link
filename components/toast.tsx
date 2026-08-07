"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[var(--error)] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.16)]">
      {message}
    </div>,
    document.body,
  );
}
