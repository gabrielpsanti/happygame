"use client";

import { useState, useEffect } from "react";

export default function Configuracoes() {
    const [nome, setNome] = useState("");
    const [tema, setTema] = useState("rosa");

    useEffect(() => {
    setNome(localStorage.getItem("usuario") || "");
    setTema(localStorage.getItem("tema") || "rosa");
    }, []);

    function aplicarTema(cor) {
    document.documentElement.style.setProperty("--cor-principal", cor);
    }

    function salvar() {
    localStorage.setItem("usuario", nome);
    localStorage.setItem("tema", tema);

    if (tema === "rosa") aplicarTema("#ff66b2");
    if (tema === "azul") aplicarTema("#3b82f6");
    if (tema === "verde") aplicarTema("#22c55e");

    alert("Tema aplicado ao site todo!");
    }

    function sair() {
    localStorage.clear();
    window.location.href = "/login";
    }

    return (
    <div className="bg-card max-w-xl mx-auto p-8 rounded-2xl border border-principal shadow-2xl">

        <h2 className="text-2xl font-bold mb-6 text-principal">
        ⚙️ Configurações da Conta
        </h2>

        <label className="block mb-2">Nome:</label>
        <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full p-3 rounded bg-[#1e1e1e] border border-principal mb-5"
        />

        <label className="block mb-2">Tema do site:</label>
        <select
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        className="w-full p-3 rounded bg-[#1e1e1e] border border-principal mb-6"
        >
        <option value="rosa">🌸 Rosa</option>
        <option value="azul">🔵 Azul</option>
        <option value="verde">🟢 Verde</option>
        </select>

        <div className="flex gap-4">
        <button
            onClick={salvar}
            className="bg-principal px-6 py-3 rounded font-bold hover:scale-105 transition"
        >
            Salvar Alterações
        </button>

        <button
            onClick={sair}
            className="bg-principal px-6 py-3 rounded font-bold hover:scale-105 transition"
        >
            Sair da Conta
        </button>
        </div>

    </div>
    );
}