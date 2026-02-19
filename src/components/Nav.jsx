import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed right-0 top-0 w-40 h-screen bg-card border-l border-principal p-3 flex flex-col z-20">

      <h2 className="text-principal mb-3 text-lg font-semibold">
        🎮 HappyGame
      </h2>

      <ul className="space-y-2 text-sm">
        <li><Link href="/login">⭐ Login</Link></li>
        <li><Link href="/">🏠 Feed</Link></li>
        <li><Link href="/perfil">👤 Perfil</Link></li>
        <li><Link href="/saibamais">💡 Saiba Mais</Link></li>
        <li><Link href="/configuracoes">⚙️ Configurações</Link></li>
        <li><Link href="/eventos">📅 Eventos</Link></li>
        <li><Link href="/jogos">🎮 Jogos</Link></li>
      </ul>

    </nav>
  );
}