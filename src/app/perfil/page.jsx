"use client";

import { useState, useEffect } from "react";
import Head from 'next/head';

export default function Perfil() {
    const [foto, setFoto] = useState("/mario.jpg");
    const [nome, setNome] = useState("Jogador Pro");

    useEffect(() => {
    setNome(localStorage.getItem("usuario") || "Jogador Pro");
    setFoto(localStorage.getItem("foto") || "/mario.jpg");
    }, []);

    function trocarFoto(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        localStorage.setItem("foto", reader.result);
        setFoto(reader.result);
    };

    reader.readAsDataURL(file);
    }

    return (
    <>
    <Head><title>Perfil | HappyGame</title></Head>
    <h1 className="text-3xl font-bold mb-4">Perfil</h1>
    <div className="bg-[#2a2a2a] max-w-2xl mx-auto p-10 rounded-2xl shadow-xl border-l-4 border-principal text-center">

        <div className="flex justify-center mb-6">
        <div className="relative">
            <img
            src={foto}
            alt={`Foto de perfil de ${nome || 'usuário'}`}
            className="w-40 h-40 rounded-full border-4 border-principal object-cover"
            />
            <label htmlFor="foto-perfil" className="sr-only">Alterar foto de perfil</label>
            <input
            id="foto-perfil"
            type="file"
            onChange={trocarFoto}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Selecionar arquivo para alterar foto de perfil"
            />
        </div>
        </div>

        <h2 className="text-2xl font-bold">{nome}</h2>
        <p className="text-pink-400 mb-6">Membro desde 2024</p>

        <p className="text-sm leading-relaxed">
        Pro gamer e explorador de mundos digitais!
        </p>
    </div>
    </>
    );
}