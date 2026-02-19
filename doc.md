# HappyGame

## 1. Visão Geral do Projeto
- Descrição do sistema: Aplicação web social para gamers, com foco em interação entre usuários (posts, curtidas, comentários e reposts), personalização de perfil e descoberta de jogos.
- Problema que resolve: Centraliza interações rápidas da comunidade gamer em um ambiente simples, seguro e prático de usar.
- Público-alvo: Jogadores casuais e entusiastas que desejam compartilhar momentos, organizar eventos pessoais, conhecer comunidades e novos jogos.
- Objetivo principal: Prover uma experiência social funcional, com interface responsiva e tema personalizável.

## 2. Arquitetura do Sistema
- Tipo de aplicação: Aplicação web SPA utilizando Next.js (App Router) com componentes client-side.
- Estrutura geral:
  - Front-end: React/Next.js, Tailwind CSS para estilização, páginas e componentes client-side.
  - Back-end: Ainda há backend implementado. A persistência dos dados acontece (por enquanto) ainda via localStorage no navegador e leitura de arquivo JSON estático no diretório público.
- Fluxo de comunicação entre camadas:
  - Interações do usuário atualizam estado local (React useState) e persistem dados no localStorage.
  - Listagem de jogos consome arquivo estático public/games.json via fetch na rota /games.json.
- Organização de pastas e responsabilidades:
  - src/app: páginas da aplicação (Feed, Login, Perfil, Configurações, Saiba Mais, Eventos, Jogos) e layout global.
  - src/components: componentes compartilhados (navegação lateral e rodapé).
  - public: ativos estáticos (imagens e games.json).
  - Arquivos de configuração na raiz: next.config.mjs, eslint.config.mjs, postcss/tailwind configs e jsconfig para aliases.

## 3. Tecnologias Utilizadas
- Linguagens: JavaScript (ESNext) com React.
- Frameworks: Next.js 16 (App Router) para estrutura de rotas e build web.
- Bibliotecas: React 19 para componentes e estado; Tailwind CSS 4 para utilitários de estilo.
- Banco de dados: Ainda não há banco de dados. Persistência local com localStorage.

Papel de cada tecnologia:
- Next.js: roteamento, empacotamento, execução em desenvolvimento e produção, organização via App Router.
- React: composição de UI e gerenciamento de estado local com hooks.
- Tailwind CSS: estilização baseada em utilitários e variáveis CSS (tema dinâmico por CSS custom properties).
- localStorage: persistência simples de posts, eventos, tema, nome de usuário e foto de perfil.

## 4. Funcionalidades Principais
- Feed (página inicial):
  - Criar posts de texto, listar posts, curtir, comentar, repostar e apagar. Dados ainda salvos no navegador.
- Autenticação simplificada (Login):
  - Registra nome do usuário no navegador e redireciona para o Perfil. Ainda não há verificação de credenciais nem sessões de servidor.
- Perfil:
  - Exibe nome e foto do usuário. Permite trocar a foto enviando arquivo local (armazenada em base64 no navegador). Busca o nome no localstorage também.
- Configurações:
  - Alterar nome e escolher tema (rosa, azul, verde). Aplica o tema globalmente via CSS custom properties e salva preferências no navegador. Opção de “sair” limpa os dados locais.
- Jogos:
  - Lista jogos em destaque consumindo public/games.json. Exibe imagem, nome e nota.
- Eventos:
  - Criar eventos com nome, data e hora. Listar e apagar eventos.
- Navegação e Layout:
  - Navegação lateral fixa com links para as seções. Cabeçalho e rodapé padronizados. Tema global aplicado no layout.

Fluxo de uso (visão do usuário):
1. Acessa o site e visualiza o Feed. Pode publicar e interagir com posts imediatamente.
2. Acessa Login para definir seu nome, sendo então redirecionado ao Perfil.
3. Em Perfil, pode ajustar a foto. Em Configurações, escolhe um tema e salva.
4. Em Jogos, explora a lista de jogos do arquivo local. Em Eventos, cria lembretes pessoais.

## 5. Segurança da Aplicação
Medidas identificadas no código:
- Autenticação: o login salva somente o nome no navegador. Ainda não foi implementado gerenciamento de sessão, tokens e afins.
- Validação de dados: validações básicas no cliente (ex.: checagem de campos obrigatórios para eventos e posts não vazios).
- Armazenamento seguro: dados (nome, tema, foto, posts, eventos) armazenados em localStorage. 
- Outras práticas: uso de variáveis CSS para tema e separação de responsabilidades no front-end.


## 6. Melhorias Futuras
- Backend real para posts, eventos e perfis.
- Sistema de autenticação e autorização completo, com perfis/permissões e proteção de rotas.
- Sanitização dos dados do form.
- Paginação, busca e filtros no Feed e na listagem de Jogos.
- Salvar preferências do usuário.
- Implementar logs.
- Testes unitários.

Melhorias futuras em segurança:
- Implementar autenticação real com o uso de sessões.
- Controle de acesso por rota e perfis de usuário.
- Sanitizar os dados antes de salvar.
- Remoção de dados sensíveis do localStorage (usar um banco de dados no backend).