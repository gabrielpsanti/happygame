'use client';

import React, { useEffect, useState } from "react";
import Head from 'next/head';
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

    function atualizarCores() {
    const styles = getComputedStyle(document.documentElement);

    setCores({
        principal: styles.getPropertyValue("--cor-principal").trim(),
        secundaria: styles.getPropertyValue("--cor-secundaria").trim()
    });
    }

    useEffect(() => {

    atualizarCores();

    // observa mudanças no HTML (ex: troca de tema)
    const observer = new MutationObserver(() => {
        atualizarCores();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style", "class"]
    });

    return () => observer.disconnect();

    }, []);

    const meses = [0,1,2,3,4,5];
  const usuarios = meses.map(t => Math.round(100 * Math.pow(1.2, t)));

    const data = {
    labels: meses.map(m => `Mês ${m}`),
    datasets: [
        {
        label: "Crescimento de Usuários",
        data: usuarios,
        borderColor: cores.principal,
        backgroundColor: cores.secundaria,
        pointBackgroundColor: cores.principal,
        pointBorderColor: cores.principal,
        tension: 0.4,
        fill: true
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
            text: "Projeção de Crescimento de Usuários",
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
    <>
      <Head><title>Dashboards | HappyGame</title></Head>
      <h1 className="text-3xl font-bold mb-6">Dashboards</h1>
      <div className="bg-card p-6 rounded-xl w-[80%] mx-auto mt-10">
        <figure>
          <div role="img" aria-label="Gráfico de linha mostrando projeção de crescimento de usuários ao longo de seis meses">
            <Line data={data} options={options} />
          </div>
          <figcaption className="sr-only">Gráfico ilustrando tendência de crescimento de usuários mês a mês.</figcaption>
        </figure>
      </div>
    </>
    );
}