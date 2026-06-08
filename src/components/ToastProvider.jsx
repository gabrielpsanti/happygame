"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast precisa ser usado dentro de <ToastProvider>");
  }
  return ctx;
}

// Estética reaproveitada do toast original do Feed (bg semitransparente + borda).
const ESTILOS = {
  sucesso: "bg-green-900/80 border-green-500 text-green-200",
  erro: "bg-red-900/80 border-red-500 text-red-200",
  aviso: "bg-yellow-900/80 border-yellow-500 text-yellow-200",
};

const ICONES = {
  sucesso: "✅",
  erro: "⛔",
  aviso: "⚠️",
};

let idSeq = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ tipo = "sucesso", mensagem }) => {
    const id = ++idSeq;
    setToasts((atual) => [...atual, { id, tipo, mensagem }]);
    setTimeout(() => {
      setToasts((atual) => atual.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div
        className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-[90vw]"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`px-4 py-3 rounded-lg text-sm shadow-lg border ${ESTILOS[t.tipo] || ESTILOS.sucesso}`}
          >
            <span aria-hidden="true">{ICONES[t.tipo] || ICONES.sucesso}</span> {t.mensagem}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
