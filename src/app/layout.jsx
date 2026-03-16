"use client";

import { useEffect } from "react";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {

  useEffect(() => {
    const tema = localStorage.getItem("tema") || "rosa";

    if (tema === "rosa") {
      document.documentElement.style.setProperty("--cor-principal", "#ff66b2");
    }

    if (tema === "azul") {
      document.documentElement.style.setProperty("--cor-principal", "#3b82f6");
    }

    if (tema === "verde") {
      document.documentElement.style.setProperty("--cor-principal", "#22c55e");
    }
  }, []);

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex">
        <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-principal text-black px-3 py-2 rounded">Pular para o conteúdo principal</a>
        
        <Nav />

        <main id="conteudo-principal" className="flex-1 p-6 pr-44">
          <header className="bg-principal px-6 py-4 rounded-lg text-center text-xl font-semibold mb-8">
            Happy Game
          </header>

          {children}

          <Footer />
        </main>

      </body>
    </html>
  );
}