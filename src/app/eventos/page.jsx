"use client";

import { useState, useEffect } from "react";
import Head from 'next/head';

export default function Eventos() {
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("eventos")) || [];
    setEventos(salvos);
    }, []);

    function criarEvento() {
    if (!nome || !data || !hora) {
        alert("Preencha NOME, DATA e HORA para criar o evento!");
        return;
    }

    const novoEvento = {
        id: Date.now(),
        nome,
        data,
        hora,
    };

    const listaAtualizada = [...eventos, novoEvento];
    setEventos(listaAtualizada);
    localStorage.setItem("eventos", JSON.stringify(listaAtualizada));

    // Limpa os campos
    setNome("");
    setData("");
    setHora("");
    }

    function apagarEvento(id) {
    const listaFiltrada = eventos.filter((evento) => evento.id !== id);
    setEventos(listaFiltrada);
    localStorage.setItem("eventos", JSON.stringify(listaFiltrada));
    }

    return (
    <>
    <Head><title>Eventos | HappyGame</title></Head>
    <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Eventos</h1>
        <div className="bg-card p-6 rounded-xl border border-principal mb-8">
        <h2 className="text-2xl font-bold mb-4 text-principal">
            Criar Evento
        </h2>

        <label htmlFor="nome-evento" className="block mb-2">Nome do evento</label>
        <input
            id="nome-evento"
            type="text"
            placeholder="Nome do evento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full mb-3 p-3 rounded bg-[#1e1e1e] border border-principal"
        />

        <label htmlFor="data-evento" className="block mb-2">Data</label>
        <input
            id="data-evento"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full mb-3 p-3 rounded bg-[#1e1e1e] border border-principal"
        />

        <label htmlFor="hora-evento" className="block mb-2">Hora</label>
        <input
            id="hora-evento"
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-[#1e1e1e] border border-principal"
        />

        <button
            onClick={criarEvento}
            className="bg-principal px-6 py-3 rounded font-bold hover:scale-105 transition"
        >
            Criar Evento
        </button>
        </div>

        <div className="space-y-4">
        {eventos.map((evento) => (
            <div
            key={evento.id}
            className="bg-card p-5 rounded-xl border border-principal flex justify-between items-center"
            >
            <div>
                <p className="font-bold text-principal">{evento.nome}</p>
                <p className="text-sm text-gray-300">
                📅 {evento.data} ⏰ {evento.hora}
                </p>
            </div>

            <button
                onClick={() => apagarEvento(evento.id)}
                    className="bg-principal px-6 py-3 rounded font-bold hover:scale-105 transition"
            >
                Apagar
            </button>
            </div>
        ))}
        </div>

    </div>
    </>
    );
}