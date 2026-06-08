"use client";

import { useState, useEffect } from "react";
import Head from 'next/head';
import { useToast } from "@/components/ToastProvider";

export default function Configuracoes() {
    const [nome, setNome] = useState("");
    const [tema, setTema] = useState("rosa");
    const [temaClaro, setTemaClaro] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        setNome(localStorage.getItem("usuario") || "");
        setTema(localStorage.getItem("tema") || "rosa");
        setTemaClaro(localStorage.getItem("tema-claro") === "true");
    }, []);

    function aplicarTema(cor) {
        document.documentElement.style.setProperty("--cor-principal", cor);
    }

    function salvar() {
        localStorage.setItem("usuario", nome);
        localStorage.setItem("tema", tema);
        localStorage.setItem("tema-claro", temaClaro);

        if (tema === "rosa") aplicarTema("#ff66b2");
        if (tema === "azul") aplicarTema("#3b82f6");
        if (tema === "verde") aplicarTema("#22c55e");

        // Aparência claro/escuro — alto contraste (Fase 6) tem prioridade
        const contraste = localStorage.getItem("alto-contraste") === "true";
        if (contraste) {
            document.documentElement.setAttribute("data-tema", "alto-contraste");
        } else if (temaClaro) {
            document.documentElement.setAttribute("data-tema", "claro");
        } else {
            document.documentElement.removeAttribute("data-tema");
        }

        addToast({ tipo: "sucesso", mensagem: "Alterações salvas!" });
    }

    function sair() {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
    <>
    <Head><title>Configurações | HappyGame</title></Head>
    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-principal">⚙️ Configurações da Conta</h1>
    <div className="bg-card max-w-xl mx-auto p-8 rounded-2xl border border-principal shadow-2xl">

        <label htmlFor="nome" className="block mb-2">Nome:</label>
        <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 rounded bg-input border border-principal mb-5"
        />

        <label htmlFor="tema" className="block mb-2">Cor de destaque:</label>
        <select
            id="tema"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full p-3 rounded bg-input border border-principal mb-4"
        >
            <option value="rosa">🌸 Rosa</option>
            <option value="azul">🔵 Azul</option>
            <option value="verde">🟢 Verde</option>
        </select>

        <label htmlFor="aparencia" className="block mb-2">Aparência:</label>
        <select
            id="aparencia"
            value={temaClaro ? "claro" : "escuro"}
            onChange={(e) => setTemaClaro(e.target.value === "claro")}
            className="w-full p-3 rounded bg-input border border-principal mb-4"
        >
            <option value="escuro">🌙 Escuro</option>
            <option value="claro">☀️ Claro</option>
        </select>

        <div className="flex gap-4">
            <button
                onClick={salvar}
                className="bg-principal px-6 py-3 rounded font-bold hover:scale-105 transition cursor-pointer"
            >
                Salvar Alterações
            </button>

            <button
                onClick={sair}
                className="bg-principal px-6 py-3 rounded font-bold hover:scale-105 transition cursor-pointer"
            >
                Sair da Conta
            </button>
        </div>

    </div>
    </>
    );
}
