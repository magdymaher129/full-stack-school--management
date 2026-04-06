"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { Toast, ToastType } from "@/lib/types";

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const TOAST_DURATION = 3000;

const ICONS: Record<ToastType, string> = {
  success: "fa-check-circle",
  error: "fa-times-circle",
  info: "fa-info-circle",
  warning: "fa-exclamation-triangle",
};

const COLORS: Record<ToastType, string> = {
  success: "bg-emerald-600",
  error: "bg-red-600",
  info: "bg-sky-600",
  warning: "bg-amber-600",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[70] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: 360 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-in pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg animate-[toastIn_0.4s_ease]"
            style={{ animation: "toastIn 0.4s ease" }}
          >
            <i className={`fas ${ICONS[t.type]}`} />
            <span className="flex-1">{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="opacity-70 hover:opacity-100">
              <i className="fas fa-times text-xs" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}