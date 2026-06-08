"use client"

import { useEffect, useState } from "react"
import Head from 'next/head'
import EmptyState from "@/components/EmptyState"

export default function Jogos() {
  const [jogos, setJogos] = useState([])
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    async function buscarJogos() {
      try {
        const res = await fetch("/games.json")
        const data = await res.json()
        setJogos(data)
      } catch (error) {
        console.error("Erro ao carregar jogos:", error)
      } finally {
        setCarregado(true)
      }
    }

    buscarJogos()
  }, [])

  return (
    <>
      <Head><title>Jogos | HappyGame</title></Head>
      <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        🎮 Jogos em Destaque
      </h1>

      {carregado && jogos.length === 0 && (
        <EmptyState
          icone="🎮"
          titulo="Nenhum jogo na vitrine"
          mensagem="Ainda não há jogos em destaque por aqui."
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jogos.map((jogo) => (
          <div
            key={jogo.id}
            className="bg-card rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <img
              src={jogo.image}
              alt={jogo.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold">{jogo.name}</h2>
              <p className="text-sm opacity-70">
                Nota: {jogo.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}