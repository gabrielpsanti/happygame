'use client';

import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

import { generateUsers } from "../utils/predictions";
import { linearTrend } from "../utils/trend";

ChartJS.register(
    LineElement,
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
    secundaria: "#ff9ad3"
    });

    const [chartData, setChartData] = useState(null);

    function atualizarCores() {
    const styles = getComputedStyle(document.documentElement);

    setCores({
        principal: styles.getPropertyValue("--cor-principal").trim(),
        secundaria: styles.getPropertyValue("--cor-secundaria").trim()
    });
    }

        useEffect(() => {
        atualizarCores();

        const observer = new MutationObserver(() => {
            atualizarCores();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["style", "class"]
        });

        const rawData = generateUsers(6);
        const dataComTrend = linearTrend(rawData);
        setChartData(dataComTrend);

        return () => observer.disconnect();
    }, []);

    if (!chartData) return null;

    const labels = chartData.map(item => item.mes);
    const usuarios = chartData.map(item => item.usuarios);
    const tendencia = chartData.map(item => item.tendencia);

    const crescimento =
    ((usuarios[usuarios.length - 1] - usuarios[0]) / usuarios[0]) * 100;

    const data = {
    labels: labels,
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

    const options = {
    responsive: true,
    plugins: {
        legend: {
        labels: { color: "white" }
        },
        title: {
        display: true,
        text: "Análise Preditiva de Crescimento de Usuários",
        color: "white"
        }
    },
    scales: {
        x: {
        ticks: { color: "white" }
        },
        y: {
        ticks: { color: "white" }
        }
    }
    };

    return (
    <div className="bg-card p-6 rounded-xl w-[80%] mx-auto mt-10">

        <p className="text-white mb-4 text-lg">
        Crescimento previsto: {crescimento.toFixed(2)}%
        </p>

        <Line data={data} options={options} />

    </div>
    );
}