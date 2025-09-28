# Brev.ly

### Um encurtador de URLs completo, construído com tecnologias modernas no ecossistema TypeScript.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Começar](#como-começar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Execução](#instalação-e-execução)
- [Licença](#licença)

---

## 📖 Sobre o Projeto

**Brev.ly** é uma aplicação full-stack de encurtamento de URLs que permite aos usuários transformar links longos e complexos em links curtos e fáceis de compartilhar. O projeto foi desenvolvido com foco em boas práticas, performance e uma ótima experiência de usuário.

### ✨ Funcionalidades Principais:

- **Criação de Links:** Encurte qualquer URL, com a opção de criar um slug customizado.
- **Listagem e Gerenciamento:** Visualize todos os links criados, com contagem de acessos.
- **Copiar e Deletar:** Ações rápidas para copiar um link curto ou deletá-lo.
- **Exportação para CSV:** Exporte um relatório de todos os seus links com um único clique.
- **Redirecionamento Inteligente:** Uma página de redirecionamento amigável que incrementa a contagem de acessos antes de enviar o usuário ao destino final.
- **Design Responsivo:** Interface totalmente adaptável para desktops e dispositivos móveis.

---

## 🚀 Tecnologias Utilizadas

O projeto é um monorepo dividido em `server` (backend) e `web` (frontend), utilizando as seguintes tecnologias:

### Backend (`server`)

- **Node.js**: Ambiente de execução
- **TypeScript**: Tipagem estática
- **Fastify**: Framework web de alta performance
- **PostgreSQL**: Banco de dados relacional
- **Drizzle ORM**: ORM leve e seguro para TypeScript
- **Zod**: Validação de schemas
- **Docker & Docker Compose**: Containerização e orquestração do ambiente

### Frontend (`web`)

- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática
- **Vite**: Bundler e servidor de desenvolvimento
- **Ant Design**: Biblioteca de componentes de UI
- **Styled Components**: CSS-in-JS para estilização
- **Tanstack Query (React Query)**: Gerenciamento de estado do servidor
- **React Router DOM**: Roteamento
- **Sonner**: Notificações (toasts)

---

## 🚀 Como Começar

Siga estas instruções para ter uma cópia do projeto rodando localmente para desenvolvimento e testes.

### Pré-requisitos

Você precisa ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/) (v22.x ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/torresgt/brevly.git
    ```

2.  **Configure o Backend:**

    - Navegue até a pasta do servidor:
      ```bash
      cd server
      ```
    - Crie uma cópia do arquivo de exemplo `.env.example` (se houver um) ou crie um novo arquivo chamado `.env` e preencha com as suas variáveis, seguindo o modelo abaixo. A `DATABASE_URL` já está configurada para o ambiente Docker Compose.

      ```env
      # server/.env
      PORT=3333
      NODE_ENV=development

      # Database (para Docker Compose)
      DATABASE_URL="postgresql://docker:docker@pg:5432/shortener"

      # Cloudflare R2
      CLOUDFLARE_ACCOUNT_ID="SEU_ACCOUNT_ID"
      CLOUDFLARE_ACCESS_KEY_ID="SUA_ACCESS_KEY_ID"
      CLOUDFLARE_SECRET_ACCESS_KEY="SUA_SECRET_ACCESS_KEY"
      CLOUDFLARE_BUCKET="SEU_BUCKET"
      CLOUDFLARE_PUBLIC_URL="SUA_URL_PUBLICA_DO_BUCKET"
      ```

3.  **Inicie o Ambiente com Docker Compose:**

    - Ainda dentro da pasta `server`, execute o seguinte comando:
      ```bash
      docker-compose up --build
      ```
    - Este comando irá construir a imagem da sua API, iniciar o container do backend e o container do banco de dados PostgreSQL. Aguarde até ver a mensagem "HTTP server running!".

4.  **Configure e Inicie o Frontend:**

    - Abra um **novo terminal**.
    - Navegue até a pasta do frontend:
      ```bash
      cd web
      ```
    - Instale as dependências:
      ```bash
      npm install
      ```
    - Inicie o servidor de desenvolvimento:
      ```bash
      npm run dev
      ```

5.  **Acesse a Aplicação:**
    - 🎉 Frontend estará disponível em: **`http://localhost:5173`** (ou a porta indicada no terminal).
    - A API do Backend estará escutando em: **`http://localhost:3333`**.

---

## 📜 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.
