"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [fonteAtual, setFonteAtual] = useState("normal");
  const [altoContraste, setAltoContraste] = useState(false);

  useEffect(() => {
    const salva = localStorage.getItem("fonte") || "normal";
    setFonteAtual(salva);
    document.documentElement.setAttribute("data-fonte", salva);

    const contraste = localStorage.getItem("alto-contraste") === "true";
    setAltoContraste(contraste);
    if (contraste) document.documentElement.setAttribute("data-tema", "alto-contraste");
  }, []);

  function mudarFonte(tamanho) {
    document.documentElement.setAttribute("data-fonte", tamanho);
    localStorage.setItem("fonte", tamanho);
    setFonteAtual(tamanho);
  }

  function toggleContraste() {
    const novo = !altoContraste;
    setAltoContraste(novo);
    localStorage.setItem("alto-contraste", novo);
    if (novo) {
      document.documentElement.setAttribute("data-tema", "alto-contraste");
    } else {
      document.documentElement.removeAttribute("data-tema");
    }
  }

  return (
    <nav aria-label="Menu principal" className="fixed right-0 top-0 w-40 h-screen bg-card border-l border-principal p-3 flex flex-col z-20">

      <p className="text-principal mb-3 text-lg font-semibold">
        🎮 HappyGame
      </p>

      <ul className="space-y-2 text-sm">
        <li><Link href="/login">⭐ Login</Link></li>
        <li><Link href="/">🏠 Feed</Link></li>
        <li><Link href="/perfil">👤 Perfil</Link></li>
        <li><Link href="/saibamais">💡 Saiba Mais</Link></li>
        <li><Link href="/sustentabilidade">🌱 Sustentabilidade</Link></li>
        <li><Link href="/configuracoes">⚙️ Configurações</Link></li>
        <li><Link href="/eventos">📅 Eventos</Link></li>
        <li><Link href="/jogos">🎮 Jogos</Link></li>
        <li><Link href="/dashboards">📊 Dashboards</Link></li>
      </ul>

      <div aria-label="Tamanho da fonte" className="flex gap-1 mt-4">
        {[["pequena", "A-"], ["normal", "A"], ["grande", "A+"]].map(([t, label]) => (
          <button
            key={t}
            onClick={() => mudarFonte(t)}
            aria-pressed={fonteAtual === t}
            className={`flex-1 py-1 border border-principal rounded text-xs transition cursor-pointer
              ${fonteAtual === t
                ? "bg-principal text-black font-bold"
                : "text-principal hover:bg-principal hover:text-black"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={toggleContraste}
        aria-pressed={altoContraste}
        className={`mt-1 w-full py-1 border border-principal rounded text-xs transition cursor-pointer
          ${altoContraste
            ? "bg-principal text-black font-bold"
            : "text-principal hover:bg-principal hover:text-black"}`}
      >
        Alto contraste
      </button>

    </nav>
  );
}
