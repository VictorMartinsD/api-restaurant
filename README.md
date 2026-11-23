<div align="center">

# api-restaurant

API REST para gestão de mesas, sessões de atendimento e pedidos em restaurantes.

[![Especificação de Produto](https://img.shields.io/badge/Especifica%C3%A7%C3%A3o%20de%20Produto-Documenta%C3%A7%C3%A3o-64748b?style=for-the-badge&logo=jira&logoColor=white)](./docs/product-spec.md)
[![Notas de Estudo](https://img.shields.io/badge/Notas%20de%20Estudo-Documenta%C3%A7%C3%A3o-7c3aed?style=for-the-badge&logo=bookstack&logoColor=white)](./docs/study-notes.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](./LICENSE)

</div>

<a name="sumario"></a>

<div align="center">

## Sumário | Summary

| Português                                                                                                                                                                                                                                                                                                                                                           | English                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Sobre o Projeto](#sobre-o-projeto)<br>[Visão de Produto](#visao-de-produto)<br>[Casos de Uso](#casos-de-uso)<br>[Funcionalidades](#funcionalidades)<br>[Tecnologias e Ferramentas](#tecnologias)<br>[Arquitetura e Decisões Técnicas](#arquitetura)<br>[Como Rodar Localmente](#como-rodar)<br>[Limitações Conhecidas](#limitacoes)<br>[Aprendizado](#aprendizado) | [About the Project](#about-the-project)<br>[Product Overview](#product-overview)<br>[Use Cases](#use-cases)<br>[Features](#features)<br>[Technologies and Tools](#technologies)<br>[Architecture and Technical Decisions](#architecture)<br>[Running Locally](#running-locally)<br>[Known Limitations](#limitations)<br>[Learning](#learning) |

</div>

<a name="sobre-o-projeto"></a>

## 📌 Sobre o Projeto

O **api-restaurant** é uma API REST para organizar o atendimento presencial de restaurantes. O sistema centraliza mesas, produtos, sessões de consumo e pedidos em um fluxo consistente de abertura de mesa, lançamento de consumo e encerramento da conta.

O projeto resolve a falta de vínculo claro entre uma mesa, os itens consumidos e o atendimento em andamento. Foi desenvolvido em Node.js com TypeScript, Express, Zod e SQLite/Knex, separando HTTP, regras de aplicação, persistência e tratamento de erros.

<a name="visao-de-produto"></a>

## 🎯 Visão de Produto

O produto permite que a equipe consulte mesas e produtos, abra uma sessão para uma mesa, registre pedidos e acompanhe o valor acumulado antes de fechar o atendimento. O principal público é composto por atendentes e responsáveis pelo controle operacional de restaurantes.

Para detalhes sobre problemas, regras de negócio e requisitos, consulte a [Especificação de Produto](./docs/product-spec.md).

<a name="casos-de-uso"></a>

## 🧩 Casos de Uso

- Abrir uma sessão para registrar o atendimento de uma mesa ocupada.
- Consultar o catálogo de produtos e localizar itens pelo nome.
- Cadastrar, alterar ou remover produtos disponíveis no restaurante.
- Registrar vários pedidos vinculados à sessão ativa de uma mesa.
- Consultar os itens lançados e o total acumulado da conta.
- Encerrar uma sessão e liberar a mesa para um novo atendimento.

<a name="funcionalidades"></a>

## ✨ Funcionalidades

- Listagem das mesas em ordem numérica.
- CRUD completo de produtos com validação de nome e preço.
- Filtro de produtos pelo nome.
- Criação e histórico de sessões de mesa.
- Bloqueio de múltiplas sessões abertas para uma mesma mesa.
- Criação de pedidos em sessões abertas.
- Registro do preço do produto no momento do pedido.
- Consulta dos pedidos por sessão em ordem decrescente de criação.
- Cálculo do total financeiro e da quantidade acumulada.
- Endpoint de saúde em `GET /health`.

<a name="tecnologias"></a>

## 🛠️ Tecnologias e Ferramentas

### Core

| Tecnologia     | Versão    | Função e impacto na arquitetura                                          |
| -------------- | --------- | ------------------------------------------------------------------------ |
| **Node.js**    | Nativo    | Executa o servidor HTTP e os scripts JavaScript/TypeScript da aplicação. |
| **Express**    | `^4.19.2` | Define o servidor HTTP, os middlewares e as rotas da API REST.           |
| **TypeScript** | `^5.5.4`  | Fornece tipagem estática, configuração strict e compilação para ES2022.  |

### Validação e Dados

| Tecnologia | Versão    | Função e impacto na arquitetura                                            |
| ---------- | --------- | -------------------------------------------------------------------------- |
| **Zod**    | `^3.23.8` | Valida corpos e parâmetros antes das operações de banco.                   |
| **Knex**   | `^3.1.0`  | Executa consultas SQL, migrações e seeds por meio de um query builder.     |
| **SQLite** | `^5.1.7`  | Persiste mesas, produtos, sessões e pedidos em `src/database/database.db`. |

### Qualidade e Automação

| Tecnologia      | Versão    | Função e impacto na arquitetura                                              |
| --------------- | --------- | ---------------------------------------------------------------------------- |
| **ESLint**      | `^10.0.1` | Analisa o código-fonte e aplica regras de qualidade configuradas no projeto. |
| **Prettier**    | `latest`  | Padroniza a formatação dos arquivos.                                         |
| **Husky**       | `^9.1.7`  | Configura hooks Git locais para automação.                                   |
| **lint-staged** | `^16.2.7` | Executa correções de ESLint e formatação nos arquivos preparados no commit.  |
| **tsx**         | `^4.16.2` | Executa e observa arquivos TypeScript durante o desenvolvimento.             |
| **rimraf**      | `^6.1.3`  | Remove o diretório de distribuição antes da compilação.                      |

<a name="arquitetura"></a>

## 🏗️ Arquitetura e Decisões Técnicas

A aplicação segue uma organização modular em camadas. As rotas encaminham as requisições aos controladores; os controladores validam dados com Zod, aplicam regras de estado e acessam o banco por Knex; o middleware centraliza as respostas de erro.

```text
api-restaurant/
├── .husky/
│   └── pre-commit                 # Executa lint-staged
├── docs/
│   ├── product-spec.md            # Especificação do produto
│   └── study-notes.md             # Notas técnicas de estudo
├── src/
│   ├── app.ts                     # Configuração do Express e rotas
│   ├── server.ts                  # Inicialização do servidor HTTP
│   ├── controllers/
│   │   ├── orders-controller.ts   # Pedidos e totais
│   │   ├── products-controller.ts # CRUD de produtos
│   │   ├── tables-controller.ts   # Consulta de mesas
│   │   └── tables-sessions-controller.ts
│   ├── database/
│   │   ├── database.db            # Banco SQLite
│   │   ├── knex.ts                # Instância do Knex
│   │   ├── migrations/            # Evolução do schema
│   │   ├── seeds/                 # Dados iniciais
│   │   └── types/                 # Tipos dos repositórios
│   ├── middlewares/
│   │   └── error-handling.ts      # Respostas padronizadas de erro
│   ├── routes/                    # Registro dos endpoints
│   └── utils/
│       └── AppError.ts            # Erros controlados da aplicação
├── knexfile.ts                    # Configuração TypeScript do Knex
├── knexfile.js                    # Configuração JavaScript para a CLI
├── requests-insomnia.yaml         # Coleção de exemplos da API
├── ts.config.json                 # Configuração TypeScript
└── package.json                   # Dependências e scripts
```

Decisões relevantes:

- **Sessões de mesa:** cada ciclo de atendimento é separado por uma entrada em `tables_sessions`.
- **Preços históricos:** o pedido guarda uma cópia do preço vigente no momento da criação.
- **Integridade referencial:** as conexões SQLite ativam `PRAGMA foreign_keys = ON`.
- **Validação na entrada:** Zod valida dados JSON e parâmetros antes das consultas.
- **Erros centralizados:** `AppError`, `ZodError` e falhas inesperadas passam pelo mesmo middleware.
- **SQLite local:** reduz a infraestrutura necessária para desenvolvimento e estudo.

<a name="como-rodar"></a>

## ▶️ Como Rodar Localmente

### Pré-requisitos

- Node.js
- npm

### Instalação e execução

```bash
npm install
npm run knex -- migrate:latest
npm run knex -- seed:run
npm run dev
```

A API fica disponível em `http://localhost:3333`. A porta pode ser alterada pela variável de ambiente `PORT`.

### Scripts

| Comando                          | Função                                                            |
| -------------------------------- | ----------------------------------------------------------------- |
| `npm run dev`                    | Executa o servidor com recarregamento automático via `tsx watch`. |
| `npm run build`                  | Limpa `dist` e compila o projeto.                                 |
| `npm start`                      | Executa a compilação de produção.                                 |
| `npm run lint`                   | Executa o ESLint.                                                 |
| `npm run format`                 | Aplica o Prettier em todos os arquivos.                           |
| `npm run check`                  | Executa lint e validação de formatação.                           |
| `npm run knex -- migrate:latest` | Aplica as migrações.                                              |
| `npm run knex -- seed:run`       | Insere dados iniciais.                                            |

### Principais endpoints

| Método                | Endpoint                                        | Finalidade                              |
| --------------------- | ----------------------------------------------- | --------------------------------------- |
| `GET`                 | `/health`                                       | Verifica se a API está disponível.      |
| `GET`                 | `/tables`                                       | Lista as mesas.                         |
| `GET/POST`            | `/tables-sessions`                              | Lista ou abre sessões.                  |
| `PATCH`               | `/tables-sessions/:id`                          | Fecha uma sessão.                       |
| `GET/POST/PUT/DELETE` | `/products` e `/products/:id`                   | Lista, cria, altera ou remove produtos. |
| `POST`                | `/orders`                                       | Cria um pedido.                         |
| `GET`                 | `/orders/table-session/:table_session_id`       | Lista pedidos de uma sessão.            |
| `GET`                 | `/orders/table-session/:table_session_id/total` | Consulta total e quantidade acumulados. |

<a name="limitacoes"></a>

## ⚠️ Limitações Conhecidas

- Não há autenticação, autorização ou separação de permissões.
- Não há interface visual própria.
- Não há fluxo de pagamento ou formas de encerramento da conta.
- Não há edição ou exclusão de pedidos já lançados.
- O campo `quantity` ainda não é validado como inteiro positivo.
- Não há testes automatizados configurados.
- Não há cache, paginação, notificações ou integração com estoque e caixa.
- O cadastro de mesas não possui operações de criação ou edição pela API.

<a name="aprendizado"></a>

## 📚 Aprendizado

O projeto pratica API REST, TypeScript strict, validação com Zod, migrações e seeds com Knex, consultas SQLite, regras de estado e tratamento centralizado de erros. Também reforça a importância de preservar dados históricos e evitar que mudanças futuras no catálogo alterem contas já registradas.

Detalhes técnicos e decisões de implementação estão disponíveis nas [Notas de Estudo](./docs/study-notes.md).

---

**Desenvolvido por [Victor Martins](https://github.com/VictorMartinsD)**

Desenvolvedor Front-End focado em aplicações web modernas e performance.

---

<div align="center">

## English Version

# api-restaurant

REST API for table, attendance-session, and order management in restaurants.

[![Product Spec](https://img.shields.io/badge/Product%20Spec-Documentation-64748b?style=for-the-badge&logo=jira&logoColor=white)](./docs/product-spec.md)
[![Study Notes](https://img.shields.io/badge/Study%20Notes-Documentation-7c3aed?style=for-the-badge&logo=bookstack&logoColor=white)](./docs/study-notes.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](./LICENSE)

</div>

<a name="about-the-project"></a>

## 📌 About the Project

**api-restaurant** is a REST API for organizing on-site restaurant service. It centralizes tables, products, consumption sessions, and orders into a consistent flow for opening a table, recording consumption, and closing the account.

The project addresses the lack of a clear relationship between a table, consumed items, and the current attendance cycle. It is built with Node.js, TypeScript, Express, Zod, SQLite, and Knex, separating HTTP setup, application rules, persistence, and error handling.

<a name="product-overview"></a>

## 🎯 Product Overview

The product allows restaurant staff to view tables and products, open a table session, create orders, and monitor the accumulated amount before closing the attendance. Its primary users are attendants and staff responsible for restaurant operations.

For business rules and requirements, see the [Product Specification](./docs/product-spec.md).

<a name="use-cases"></a>

## 🧩 Use Cases

- Open a session to record service for an occupied table.
- Browse the product catalog and locate items by name.
- Create, update, or remove products offered by the restaurant.
- Record multiple orders associated with a table's active session.
- View launched items and the accumulated account total.
- Close a session and make the table available for another attendance cycle.

<a name="features"></a>

## ✨ Features

- Table listing ordered by table number.
- Complete product CRUD with name and price validation.
- Product filtering by name.
- Table-session creation and history.
- Prevention of multiple open sessions for the same table.
- Order creation only for open sessions.
- Historical price storage at the time of order creation.
- Session-order listing in descending creation order.
- Financial total and accumulated quantity calculation.
- Health endpoint at `GET /health`.

<a name="technologies"></a>

## 🛠️ Technologies and Tools

### Core

| Technology     | Version   | Function and architectural impact                                   |
| -------------- | --------- | ------------------------------------------------------------------- |
| **Node.js**    | Native    | Runs the HTTP server and application JavaScript/TypeScript scripts. |
| **Express**    | `^4.19.2` | Defines the HTTP server, middleware, and REST API routes.           |
| **TypeScript** | `^5.5.4`  | Provides static typing, strict mode, and ES2022 compilation.        |

### Validation and Data

| Technology | Version   | Function and architectural impact                                              |
| ---------- | --------- | ------------------------------------------------------------------------------ |
| **Zod**    | `^3.23.8` | Validates bodies and parameters before database operations.                    |
| **Knex**   | `^3.1.0`  | Executes SQL queries, migrations, and seeds through a query builder.           |
| **SQLite** | `^5.1.7`  | Persists tables, products, sessions, and orders in `src/database/database.db`. |

### Quality and Automation

| Technology      | Version   | Function and architectural impact                          |
| --------------- | --------- | ---------------------------------------------------------- |
| **ESLint**      | `^10.0.1` | Analyzes source code and applies configured quality rules. |
| **Prettier**    | `latest`  | Standardizes file formatting.                              |
| **Husky**       | `^9.1.7`  | Configures local Git hooks for automation.                 |
| **lint-staged** | `^16.2.7` | Runs ESLint fixes and formatting on staged commit files.   |
| **tsx**         | `^4.16.2` | Runs and watches TypeScript files during development.      |
| **rimraf**      | `^6.1.3`  | Removes the distribution directory before compilation.     |

<a name="architecture"></a>

## 🏗️ Architecture and Technical Decisions

The application follows a modular architecture. Routes forward requests to controllers; controllers validate data with Zod, enforce state rules, and access SQLite through Knex; the middleware centralizes error responses.

```text
api-restaurant/
├── .husky/
│   └── pre-commit                 # Runs lint-staged
├── docs/
│   ├── product-spec.md            # Product specification
│   └── study-notes.md             # Technical study notes
├── src/
│   ├── app.ts                     # Express configuration and routes
│   ├── server.ts                  # HTTP server startup
│   ├── controllers/
│   │   ├── orders-controller.ts   # Orders and totals
│   │   ├── products-controller.ts # Product CRUD
│   │   ├── tables-controller.ts   # Table queries
│   │   └── tables-sessions-controller.ts
│   ├── database/
│   │   ├── database.db            # SQLite database
│   │   ├── knex.ts                # Knex instance
│   │   ├── migrations/            # Schema evolution
│   │   ├── seeds/                 # Initial data
│   │   └── types/                 # Repository types
│   ├── middlewares/
│   │   └── error-handling.ts      # Standardized error responses
│   ├── routes/                    # Endpoint registration
│   └── utils/
│       └── AppError.ts            # Controlled application errors
├── knexfile.ts                    # TypeScript Knex configuration
├── knexfile.js                    # JavaScript configuration for the CLI
├── requests-insomnia.yaml         # API request collection
├── ts.config.json                 # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

Key decisions:

- **Table sessions:** each attendance cycle is separated by a `tables_sessions` record.
- **Historical prices:** each order stores a copy of the price valid at creation time.
- **Referential integrity:** SQLite connections enable `PRAGMA foreign_keys = ON`.
- **Input validation:** Zod validates JSON data and parameters before database queries.
- **Centralized errors:** `AppError`, `ZodError`, and unexpected failures use the same middleware.
- **Local SQLite:** minimizes infrastructure requirements for development and study.

<a name="running-locally"></a>

## ▶️ Running Locally

### Prerequisites

- Node.js
- npm

### Installation and startup

```bash
npm install
npm run knex -- migrate:latest
npm run knex -- seed:run
npm run dev
```

The API is available at `http://localhost:3333`. The port can be changed with the `PORT` environment variable.

### Scripts

| Command                          | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| `npm run dev`                    | Runs the server with automatic reload through `tsx watch`. |
| `npm run build`                  | Cleans `dist` and compiles the project.                    |
| `npm start`                      | Runs the production build.                                 |
| `npm run lint`                   | Runs ESLint.                                               |
| `npm run format`                 | Applies Prettier to project files.                         |
| `npm run check`                  | Runs lint and formatting validation.                       |
| `npm run knex -- migrate:latest` | Applies migrations.                                        |
| `npm run knex -- seed:run`       | Inserts initial data.                                      |

### Main endpoints

| Method                | Endpoint                                        | Purpose                                       |
| --------------------- | ----------------------------------------------- | --------------------------------------------- |
| `GET`                 | `/health`                                       | Checks whether the API is available.          |
| `GET`                 | `/tables`                                       | Lists tables.                                 |
| `GET/POST`            | `/tables-sessions`                              | Lists or opens sessions.                      |
| `PATCH`               | `/tables-sessions/:id`                          | Closes a session.                             |
| `GET/POST/PUT/DELETE` | `/products` and `/products/:id`                 | Lists, creates, updates, or removes products. |
| `POST`                | `/orders`                                       | Creates an order.                             |
| `GET`                 | `/orders/table-session/:table_session_id`       | Lists a session's orders.                     |
| `GET`                 | `/orders/table-session/:table_session_id/total` | Returns the accumulated total and quantity.   |

<a name="limitations"></a>

## ⚠️ Known Limitations

- No authentication, authorization, or role-based permissions.
- No dedicated visual interface.
- No payment flow or account-closing methods.
- No editing or removal of existing orders.
- The `quantity` field is not yet validated as a positive integer.
- No automated tests are configured.
- No caching, pagination, notifications, or stock/cash integrations.
- The table registry has no API operations for creating or editing tables.

<a name="learning"></a>

## 📚 Learning

The project practices REST APIs, strict TypeScript, Zod validation, Knex migrations and seeds, SQLite queries, state rules, and centralized error handling. It also demonstrates the importance of preserving historical data so later catalog changes do not alter previously recorded accounts.

Technical details and implementation decisions are available in the [Study Notes](./docs/study-notes.md).

---

**Developed by [Victor Martins](https://github.com/VictorMartinsD)**

Front-End Developer focused on modern web applications and performance.
