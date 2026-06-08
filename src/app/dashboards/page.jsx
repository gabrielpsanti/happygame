'use client';

import React, { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import { generateUsers } from "../utils/predictions";
import { linearTrend } from "../utils/trend";

ChartJS.register(
    LineElement,
    BarElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {

    const [cores, setCores] = useState({
        principal: "#ff66b2",
        secundaria: "#ff9ad3",
        texto: "#ffffff"
    });

    const [chartData, setChartData] = useState(null);
    const [barData, setBarData] = useState(null);

    // Taxa de retenção gerada uma vez (useRef evita novo valor a cada re-render)
    const retencao = useRef(Math.round(60 + Math.random() * 25));

    function atualizarCores() {
        const styles = getComputedStyle(document.documentElement);

        setCores({
            principal: styles.getPropertyValue("--cor-principal").trim(),
            secundaria: styles.getPropertyValue("--cor-secundaria").trim(),
            texto: styles.getPropertyValue("--cor-texto").trim() || "#ffffff"
        });
    }

    useEffect(() => {
        atualizarCores();

        const observer = new MutationObserver(() => {
            atualizarCores();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["style", "class", "data-tema"]
        });

        const rawData = generateUsers(6);
        const dataComTrend = linearTrend(rawData);
        setChartData(dataComTrend);

        // Engajamento mensal simulado (sessões por mês)
        const sessoes = dataComTrend.map(() => Math.round(50 + Math.random() * 150));
        setBarData({
            labels: dataComTrend.map(item => item.mes),
            sessoes
        });

        // B5 — desabilita animações do Chart.js se usuário preferir
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
            ChartJS.defaults.animation = false;
        }

        return () => observer.disconnect();
    }, []);

    if (!chartData || !barData) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4" role="status">
                <div className="spinner w-12 h-12" aria-hidden="true"></div>
                <p>Carregando dados...</p>
            </div>
        );
    }

    const labels   = chartData.map(item => item.mes);
    const usuarios = chartData.map(item => item.usuarios);
    const tendencia = chartData.map(item => item.tendencia);

    const crescimento =
        ((usuarios[usuarios.length - 1] - usuarios[0]) / usuarios[0]) * 100;

    // Cards de métricas (A2)
    const usuariosAtivos = usuarios[usuarios.length - 1];
    const sessaoMedia = Math.round(usuarios.reduce((a, b) => a + b, 0) / usuarios.length);
    const metricas = [
        { titulo: "Usuários ativos", valor: usuariosAtivos, unidade: "usuários" },
        { titulo: "Sessões médias",  valor: sessaoMedia,    unidade: "sessões/mês" },
        { titulo: "Taxa de retenção", valor: retencao.current, unidade: "%" },
    ];

    const lineData = {
        labels,
        datasets: [
            {
                label: "Previsão de Usuários",
                data: usuarios,
                borderColor: cores.principal,
                backgroundColor: cores.secundaria,
                pointBackgroundColor: cores.principal,
                tension: 0.4,
                fill: true
            },
            {
                label: "Linha de Tendência",
                data: tendencia,
                borderColor: "#00ffcc",
                borderDash: [5, 5],
                tension: 0.4
            }
        ]
    };

    const barChartData = {
        labels: barData.labels,
        datasets: [
            {
                label: "Sessões",
                data: barData.sessoes,
                backgroundColor: cores.principal,
            }
        ]
    };

    const sharedOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: cores.texto } },
        },
        scales: {
            x: { ticks: { color: cores.texto } },
            y: { ticks: { color: cores.texto } }
        }
    };

    const lineOptions = {
        ...sharedOptions,
        plugins: {
            ...sharedOptions.plugins,
            title: {
                display: true,
                text: "Análise Preditiva de Crescimento de Usuários",
                color: cores.texto
            }
        }
    };

    const barOptions = {
        ...sharedOptions,
        plugins: {
            ...sharedOptions.plugins,
            title: {
                display: true,
                text: "Engajamento Mensal (sessões simuladas)",
                color: cores.texto
            }
        }
    };

    return (
        <div className="bg-card p-4 md:p-6 rounded-xl w-full md:w-[80%] mx-auto mt-10">
            <Head><title>Dashboard | HappyGame</title></Head>

            {/* A2 — Cards de métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {metricas.map(({ titulo, valor, unidade }) => (
                    <div key={titulo} className="bg-card border border-principal rounded-xl p-4">
                        <p className="text-sm text-gray-400 mb-1">{titulo}</p>
                        <p className="text-principal text-2xl font-bold">
                            {valor}
                            <span className="text-sm font-normal ml-1 text-gray-300">{unidade}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Crescimento total */}
            <p className="text-white mb-4 text-lg">
                Crescimento previsto: {crescimento.toFixed(2)}%
            </p>

            {/* A1 — Gráfico de linhas (existente) */}
            <div className="relative h-64 md:h-80">
                <Line data={lineData} options={lineOptions} />
            </div>

            {/* A1 — Gráfico de barras (engajamento) */}
            <div className="relative h-64 md:h-80 mt-8">
                <Bar data={barChartData} options={barOptions} />
            </div>

            {/* A3 — Tabela de dados */}
            <div className="mt-8 overflow-x-auto">
                <table className="w-full text-sm">
                    <caption className="sr-only">Tabela de previsão de crescimento de usuários por mês</caption>
                    <thead>
                        <tr className="border-b border-principal">
                            <th className="px-4 py-2 text-left text-principal font-semibold">Mês</th>
                            <th className="px-4 py-2 text-left text-principal font-semibold">Usuários Previstos</th>
                            <th className="px-4 py-2 text-left text-principal font-semibold">Tendência Linear</th>
                            <th className="px-4 py-2 text-left text-principal font-semibold">Variação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labels.map((mes, i) => {
                            const variacao = usuarios[i] - tendencia[i];
                            return (
                                <tr key={mes} className={i % 2 !== 0 ? "bg-[var(--cor-card-hover)]" : ""}>
                                    <td className="px-4 py-2">{mes}</td>
                                    <td className="px-4 py-2">{usuarios[i]}</td>
                                    <td className="px-4 py-2">{tendencia[i]}</td>
                                    <td className={`px-4 py-2 font-medium ${variacao >= 0 ? "text-green-400" : "text-red-400"}`}>
                                        {variacao >= 0 ? "+" : ""}{variacao}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
