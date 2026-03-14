"use client"

import { useEffect, useState } from "react"

export default function Jogos() {
  const [jogos, setJogos] = useState([])

  useEffect(() => {
    async function buscarJogos() {
      const res = await fetch("/games.json")
      const data = await res.json()
      setJogos(data)
    }

    buscarJogos()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎮 Jogos em Destaque
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jogos.map((jogo) => (
          <div
            key={jogo.id}
            className="bg-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition"
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
  )
}