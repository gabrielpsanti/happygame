"use client";

export default function EmptyState({ titulo, mensagem, icone = "✨" }) {
  return (
    <div className="bg-card border border-principal/40 rounded-xl p-10 text-center">
      <div className="text-5xl mb-3" aria-hidden="true">{icone}</div>
      <h2 className="text-lg font-bold mb-1">{titulo}</h2>
      {mensagem && <p className="text-sm text-gray-400">{mensagem}</p>}
    </div>
  );
}
