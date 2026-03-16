"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from 'next/head';

export default function Login() {
    const [nome, setNome] = useState("");
    const router = useRouter();

    function entrar() {
    if (!nome) return alert("Digite seu nome!");
    localStorage.setItem("usuario", nome);
    router.push("/perfil");
    }

    return (
    <>
    <Head><title>Login | HappyGame</title></Head>
    <div className="max-w-md mx-auto bg-card p-8 rounded-xl border border-principal shadow-xl mt-20">

        <h1 className="text-2xl font-bold mb-6 text-center text-principal">
        Login
        </h1>

        <label htmlFor="nome" className="block mb-2">Nome</label>
        <input
        id="nome"
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full p-3 rounded bg-[#1e1e1e] border border-principal mb-4"
        />

        <button
        onClick={entrar}
        className="bg-principal w-full py-3 rounded font-bold hover:scale-105 transition"
        >
        Entrar
        </button>

    </div>
    </>
    );
}