"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [fonteAtual, setFonteAtual] = useState("normal");
  const [altoContraste, setAltoContraste] = useState(false);
  const [temaClaro, setTemaClaro] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Alto contraste (Fase 6) tem prioridade sobre o tema claro/escuro (Fase 7).
  function aplicarDataTema(contraste, claro) {
    if (contraste) {
      document.documentElement.setAttribute("data-tema", "alto-contraste");
    } else if (claro) {
      document.documentElement.setAttribute("data-tema", "claro");
    } else {
      document.documentElement.removeAttribute("data-tema");
    }
  }

  useEffect(() => {
    const salva = localStorage.getItem("fonte") || "normal";
    setFonteAtual(salva);
    document.documentElement.setAttribute("data-fonte", salva);

    const contraste = localStorage.getItem("alto-contraste") === "true";
    setAltoContraste(contraste);

    const claro = localStorage.getItem("tema-claro") === "true";
    setTemaClaro(claro);

    aplicarDataTema(contraste, claro);
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
    aplicarDataTema(novo, temaClaro);
  }

  function toggleTemaClaro() {
    const novo = !temaClaro;
    setTemaClaro(novo);
    localStorage.setItem("tema-claro", novo);
    aplicarDataTema(altoContraste, novo);
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <>
      {/* Botão hambúrguer — apenas em telas < 768px */}
      <button
        onClick={() => setMenuAberto((v) => !v)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
        className="md:hidden fixed top-4 right-4 z-40 bg-card border border-principal text-principal rounded-lg px-3 py-2 text-xl leading-none cursor-pointer"
      >
        {menuAberto ? "✕" : "☰"}
      </button>

      {/* Fundo escurecido ao abrir o menu no mobile — fecha ao clicar fora */}
      {menuAberto && (
        <div
          onClick={fecharMenu}
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          aria-hidden="true"
        />
      )}

      <nav
        aria-label="Menu principal"
        className={`fixed right-0 top-0 w-40 h-screen bg-card border-l border-principal p-3 flex flex-col z-30 transition-transform duration-300
          ${menuAberto ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >

        <p className="text-principal mb-3 text-lg font-semibold">
          🎮 HappyGame
        </p>

        <ul className="space-y-2 text-sm">
          <li><Link href="/login" onClick={fecharMenu}>⭐ Login</Link></li>
          <li><Link href="/" onClick={fecharMenu}>🏠 Feed</Link></li>
          <li><Link href="/perfil" onClick={fecharMenu}>👤 Perfil</Link></li>
          <li><Link href="/saibamais" onClick={fecharMenu}>💡 Saiba Mais</Link></li>
          <li><Link href="/sustentabilidade" onClick={fecharMenu}>🌱 Sustentabilidade</Link></li>
          <li><Link href="/configuracoes" onClick={fecharMenu}>⚙️ Configurações</Link></li>
          <li><Link href="/eventos" onClick={fecharMenu}>📅 Eventos</Link></li>
          <li><Link href="/jogos" onClick={fecharMenu}>🎮 Jogos</Link></li>
          <li><Link href="/dashboards" onClick={fecharMenu}>📊 Dashboards</Link></li>
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

        <button
          onClick={toggleTemaClaro}
          aria-pressed={temaClaro}
          className={`mt-1 w-full py-1 border border-principal rounded text-xs transition cursor-pointer
            ${temaClaro
              ? "bg-principal text-black font-bold"
              : "text-principal hover:bg-principal hover:text-black"}`}
        >
          {temaClaro ? "☀️ Tema claro" : "🌙 Tema claro"}
        </button>

      </nav>
    </>
  );
}
