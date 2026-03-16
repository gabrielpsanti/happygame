"use client";

import { useState, useEffect } from "react";
import Head from 'next/head';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [texto, setTexto] = useState("");

    useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(salvos);
    }, []);

    function salvar(novos) {
    setPosts(novos);
    localStorage.setItem("posts", JSON.stringify(novos));
    }

    function postar() {
    if (!texto.trim()) return;

    const novo = {
        texto,
        curtidas: 0,
        comentarios: [],
        reposts: 0,
    };

    const novos = [novo, ...posts];
    salvar(novos);
    setTexto("");
    }

    function apagar(index) {
    salvar(posts.filter((_, i) => i !== index));
    }

    function curtir(index) {
    const novos = [...posts];
    novos[index].curtidas++;
    salvar(novos);
    }

    function repostar(index) {
    const novos = [...posts];
    novos[index].reposts++;
    salvar(novos);
    }

    function comentar(index, comentario) {
    if (!comentario.trim()) return;

    const novos = [...posts];
    novos[index].comentarios.push(comentario);
    salvar(novos);
    }

    return (
    <>
    <Head><title>Feed | HappyGame</title></Head>
    <main className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Feed</h1>

      {/* CRIAR POST */}
        <section className="bg-card p-6 rounded-lg border-l-4 border-principal">
        <label htmlFor="novo-post" className="sr-only">O que você está jogando hoje?</label>
        <textarea
            id="novo-post"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full p-3 bg-[#1e1e1e] rounded mb-3"
            placeholder="O que você está jogando hoje?"
        />

        <button
            onClick={postar}
            className="bg-principal px-6 py-2 rounded font-bold hover:scale-105 transition"
        >
            Postar
        </button>
        </section>

      {/* LISTAGEM */}
        {posts.map((post, i) => (
        <Post
            key={i}
            index={i}
            post={post}
            onCurtir={() => curtir(i)}
            onRepostar={() => repostar(i)}
            onApagar={() => apagar(i)}
            onComentar={(txt) => comentar(i, txt)}
        />
        ))}
    </main>
    </>
    );
}

function Post({ index, post, onCurtir, onRepostar, onApagar, onComentar }) {
    const [comentario, setComentario] = useState("");

    return (
    <div className="bg-card p-5 rounded shadow space-y-3 relative hover:bg-[#333] transition">

        <p>{post.texto}</p>

      {/* AÇÕES */}
        <div className="flex justify-around text-xl">
        <button onClick={onCurtir} aria-label={`Curtir. Curtidas: ${post.curtidas}`}>❤️ <span aria-hidden>{post.curtidas}</span></button>
        <button onClick={onRepostar} aria-label={`Repostar. Reposts: ${post.reposts}`}>🔁 <span aria-hidden>{post.reposts}</span></button>
        <button onClick={onApagar} className="text-red-400" aria-label="Apagar post">🗑️</button>
        </div>

      {/* COMENTÁRIOS */}
        <div className="space-y-2">
        {post.comentarios.map((c, i) => (
            <div key={i} className="bg-[#1e1e1e] p-2 rounded text-sm">
            {c}
            </div>
        ))}

        <div className="flex gap-2">
            <label htmlFor={`comentario-${index}`} className="sr-only">Adicionar comentário</label>
            <input
            id={`comentario-${index}`}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="flex-1 p-1 rounded bg-[#1e1e1e]"
            placeholder="Comentar..."
            />
            <button
            onClick={() => {
                onComentar(comentario);
                setComentario("");
            }}
            className="bg-principal px-3 rounded"
            aria-label="Enviar comentário"
            >
            💬
            </button>
        </div>
        </div>
    </div>
    );
}
