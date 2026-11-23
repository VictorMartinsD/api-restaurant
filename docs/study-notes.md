<h1 align="center">Notas de Estudo — api-restaurant</h1>

<div align="center">

## 🔗 Links do Projeto

[![Repositório](https://img.shields.io/badge/Repositório-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant)
[![Especificação de Produto](https://img.shields.io/badge/Especificação%20de%20Produto-Documentação-64748b?style=for-the-badge&logo=jira&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/docs/product-spec.md)
[![License: MIT](https://img.shields.io/badge/Licença-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/LICENSE)

</div>

<a id="sumario"></a>

<div align="center">

## Sumário | Summary

| Português                                                                                                                                                                                                                                                                                                                                                                      | English                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Visão Geral Técnica](#visao-geral-tecnica)<br>[Guia de Implementação](#guia-de-implementacao)<br>[Conceitos e Tecnologias](#conceitos-e-tecnologias)<br>[Decisões Técnicas](#decisoes-tecnicas)<br>[Problemas Resolvidos](#problemas-resolvidos)<br>[Boas Práticas](#boas-praticas)<br>[Aprendizados Técnicos](#aprendizados-tecnicos)<br>[Próximos Passos](#proximos-passos) | [Technical Overview](#technical-overview)<br>[Implementation Guide](#implementation-guide)<br>[Concepts and Technologies](#concepts-and-technologies)<br>[Technical Decisions](#technical-decisions)<br>[Resolved Issues](#resolved-issues)<br>[Best Practices](#best-practices)<br>[Technical Learnings](#technical-learnings)<br>[Next Steps](#next-steps-english) |

</div>

---

<a name="visao-geral-tecnica"></a>

## 📌 Visão Geral Técnica

### Estrutura da aplicação

O projeto é uma API REST desenvolvida em Node.js e TypeScript. O código de produção está organizado em `src`, com separação entre inicialização da aplicação, servidor HTTP, rotas, controladores, banco de dados e tratamento de erros.

```text
src/
├── app.ts
├── server.ts
├── controllers/
├── routes/
├── middlewares/
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── types/
└── utils/
```

- `app.ts` configura o Express, habilita JSON no corpo das requisições e registra o endpoint `GET /health`.
- `server.ts` cria o servidor HTTP com Node.js, lê a porta da variável `PORT` e usa `3333` como fallback.
- `routes/index.ts` conecta os módulos de mesas, produtos, sessões e pedidos.
- Os controladores concentram validação de entrada, consultas ao banco e regras de estado.
- `knex` centraliza as operações SQL e a configuração do SQLite.

### Recursos disponíveis

| Recurso            | Operações implementadas                                     |
| ------------------ | ----------------------------------------------------------- |
| `/health`          | Verificação de disponibilidade                              |
| `/tables`          | Listagem das mesas                                          |
| `/tables-sessions` | Criação, listagem e encerramento de sessões                 |
| `/products`        | CRUD completo de produtos                                   |
| `/orders`          | Criação de pedidos, listagem por sessão e cálculo de totais |

### Modelo relacional

O banco contém as entidades `products`, `tables`, `tables_sessions` e `orders`.

- `tables_sessions.table_id` referencia `tables.id`.
- `orders.table_session_id` referencia `tables_sessions.id`.
- `orders.product_id` referencia `products.id`.
- Chaves estrangeiras são ativadas em `knexfile.ts` e `knexfile.js` por meio de `PRAGMA foreign_keys = ON`.
- A tabela de pedidos registra o preço no momento da criação, permitindo consultar o valor consumido independentemente de alterações posteriores no catálogo.

---

<a name="guia-de-implementacao"></a>

## 🧭 Guia de Implementação

### Dependências e execução

O projeto usa módulos ECMAScript por meio de `"type": "module"`.

```bash
npm install
npm run knex -- migrate:latest
npm run knex -- seed:run
npm run dev
```

O servidor fica disponível em `http://localhost:3333` quando `PORT` não está definida.

### Scripts principais

- `npm run dev`: executa `src/server.ts` com `tsx watch`.
- `npm run build`: remove `dist` e compila o TypeScript com `tsc`.
- `npm start`: executa `dist/server.js`.
- `npm run lint`: executa o ESLint.
- `npm run format`: aplica o Prettier.
- `npm run check`: executa lint e validação de formatação.
- `npm run knex -- migrate:latest`: aplica as migrações.
- `npm run knex -- seed:run`: popula produtos e mesas.

Não há testes configurados; o script `test` informa explicitamente `"No tests configured"`.

### Fluxo técnico dos pedidos

1. Uma requisição passa pelo roteador Express correspondente.
2. O controlador valida o corpo ou o parâmetro com Zod quando aplicável.
3. O controlador consulta o SQLite por meio do Knex.
4. A entidade é inserida, atualizada ou relacionada a outra entidade.
5. Erros conhecidos são convertidos em `AppError`.
6. O middleware central trata `AppError`, `ZodError` e falhas inesperadas.

### Configuração do banco

As migrações estão em `src/database/migrations` e usam tipos do Knex. Os seeds estão em `src/database/seeds`.

As configurações TypeScript e JavaScript do Knex existem separadamente:

- `knexfile.ts` é usado pela aplicação em TypeScript.
- `knexfile.js` permite execução compatível com a CLI em módulos JavaScript.
- Ambos apontam para `./src/database/database.db`.

O arquivo `requests-insomnia.yaml` contém exemplos de requisições para importação no Insomnia.

---

<a name="conceitos-e-tecnologias"></a>

## 🧠 Conceitos e Tecnologias

- **Node.js e Express 4:** infraestrutura de servidor e roteamento HTTP.
- **TypeScript 5 com modo strict:** tipagem em tempo de compilação e configuração ES2022.
- **Zod:** validação de corpos JSON e parâmetros convertidos ou refinados.
- **Knex:** query builder, migrações, seeds e abstração das consultas SQL.
- **SQLite 3:** banco local persistido em `src/database/database.db`.
- **ESLint 10 e Prettier:** análise estática e padronização de formatação.
- **Husky e lint-staged:** execução de lint e formatação antes dos commits.
- **Tipos de repositório:** arquivos globais em `src/database/types` descrevem a forma das entidades usadas pelas consultas.
- **Middlewares:** encapsulam o tratamento uniforme de respostas de erro.

### Convenções observadas

- Controladores são classes instanciadas uma vez pelos módulos de rotas.
- Métodos assíncronos recebem `request`, `response` e `next`.
- Exceções são encaminhadas ao middleware por `next(error)`.
- Consultas com tipos explícitos usam `knex<T>("nome-da-tabela")`.
- Respostas de criação usam status HTTP `201`; consultas usam `200`.
- A API não possui, até o momento, autenticação ou autorização.

---

<a name="decisoes-tecnicas"></a>

## ⚙️ Decisões Técnicas

### Separação por responsabilidade

A aplicação separa configuração HTTP, rotas, controladores, persistência e erros. Isso evita concentrar inicialização do servidor e regras de negócio no mesmo módulo.

### SQLite com Knex

SQLite reduz a infraestrutura necessária em ambiente local. O Knex organiza schema, migrações e queries sem acoplar os controladores diretamente ao driver.

### Sessão antes do pedido

Pedidos dependem de uma sessão de mesa ativa. Essa associação permite que o sistema mantenha o histórico de consumo da mesa em ciclos separados.

### Preço registrado no pedido

Ao criar um pedido, o sistema copia `product.price` para `orders.price`. Dessa forma, o total pode ser calculado a partir do valor registrado no pedido.

### FKs habilitadas na conexão

O callback `afterCreate` executa `PRAGMA foreign_keys = ON` para cada conexão criada no pool SQLite.

### Middleware único de erros

O projeto diferencia erros de domínio (`AppError`, status padrão `400`), erros de validação Zod (`400`) e exceções não tratadas (`500`). A resposta de validação inclui `issues` gerados pelo Zod.

---

<a name="problemas-resolvidos"></a>

## 🧩 Problemas Resolvidos

### Prevenção de abertura duplicada

Antes de abrir uma sessão, o controlador busca a sessão mais recente da mesa. Se ela ainda não possui `closed_at`, a operação é bloqueada.

### Proteção contra pedidos em mesas fechadas

A criação de pedido verifica se a sessão existe e se `closed_at` está vazio. Uma sessão encerrada não recebe novos pedidos.

### Centralização das respostas de erro

Os controladores não precisam montar todas as respostas de exceção individualmente: o middleware interpreta os tipos conhecidos e padroniza o JSON.

### Cálculo consistente de consumo

A consulta de total usa `SUM(orders.price * orders.quantity)`. `COALESCE` garante `0` quando não existem pedidos na sessão.

### Compatibilidade da coluna de atualização

A migração `20261020190000_fix-orders-updated-at.ts` verifica as colunas existentes e renomeia `updated` para `updated_at`, ou faz o processo inverso no rollback.

### Padronização de identificação numérica

Produtos e sessões convertem IDs de parâmetros de string para número e validam quando necessário com Zod antes das operações no banco.

---

<a name="boas-praticas"></a>

## 🛠️ Boas Práticas

- Manter regras de validação próximas ao ponto de entrada dos controladores.
- Encaminhar exceções ao middleware em vez de enviá-las diretamente em cada bloco `catch`.
- Usar migrações para evoluir o schema e incluir um método `down` correspondente.
- Ativar integrações críticas, como foreign keys, na criação da conexão.
- Registrar o preço histórico em pedidos.
- Usar `next(error)` para não cair em caminhos silenciosos após exceções.
- Executar ESLint, Prettier e lint-staged antes da integração das alterações.
- Consultar a entidade e validar seu estado antes de alterar recursos relacionados.
- Tratar resultados agregados vazios com `COALESCE`.

---

<a name="aprendizados-tecnicos"></a>

## 📚 Aprendizados Técnicos

- O uso de Zod permite separar validação estrutural de erros de domínio.
- Migrações incrementais ajudam a corrigir mudanças no schema, como o renomeamento de `updated` para `updated_at`.
- Uma chave estrangeira ativa no banco não substitui validações claras na API.
- Consultas SQL agregadas podem ser simplificadas com funções como `SUM` e `COALESCE`.
- Tipos globais podem documentar a forma dos registros sem criar uma camada ORM.
- Separar `app` de `server` facilita testar e configurar o aplicativo Express independentemente da abertura da porta.
- Variáveis de ambiente podem ser incorporadas sem alterar o código, usando `PORT` com valor padrão.
- Seeds permitem reproduzir dados iniciais de mesas e produtos.

---

<a name="proximos-passos"></a>

## 🔄 Próximos Passos

- Adicionar testes automatizados para controladores, validações, rotas e migrações.
- Testar a API em ambiente automatizado e documentar os formatos de resposta.
- Validar se a mesa existe antes de criar uma sessão.
- Validar `quantity` como número inteiro positivo em pedidos.
- Validar IDs de parâmetros em todas as rotas, incluindo `table_session_id`.
- Revisar tipos globais para permitir `null` em `closed_at`.
- Definir regras de atualização para o campo `updated_at` dos pedidos.
- Adicionar paginação ou filtros às listagens conforme o crescimento dos dados.
- Definir autenticação e autorização caso a API seja exposta a clientes externos.
- Criar documentação completa dos endpoints baseada no arquivo Insomnia.

---

Notas de estudo técnico por [Victor Martins](https://github.com/VictorMartinsD).

---

<div align="center">

## ENGLISH VERSION

# Study Notes — api-restaurant

## 🔗 Project Links

[![Repository](https://img.shields.io/badge/Repository-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant)
[![Product Spec](https://img.shields.io/badge/Product%20Spec-Documentation-64748b?style=for-the-badge&logo=jira&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/docs/product-spec.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/LICENSE)

</div>

---

<a name="technical-overview"></a>

## 📌 Technical Overview

### Application structure

This project is a REST API developed with Node.js and TypeScript. Production code is organized under `src`, separating application setup, HTTP server startup, routes, controllers, database access, and error handling.

```text
src/
├── app.ts
├── server.ts
├── controllers/
├── routes/
├── middlewares/
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── types/
└── utils/
```

- `app.ts` configures Express, enables JSON request bodies, and registers `GET /health`.
- `server.ts` creates the Node.js HTTP server, reads `PORT`, and uses `3333` as the fallback.
- `routes/index.ts` connects the table, product, table-session, and order modules.
- Controllers contain input validation, database queries, and state rules.
- Knex centralizes SQL operations and SQLite configuration.

### Available resources

| Resource           | Implemented operations                                 |
| ------------------ | ------------------------------------------------------ |
| `/health`          | Availability check                                     |
| `/tables`          | Table listing                                          |
| `/tables-sessions` | Session creation, listing, and closure                 |
| `/products`        | Full product CRUD                                      |
| `/orders`          | Order creation, session listing, and total calculation |

### Relational model

The database contains `products`, `tables`, `tables_sessions`, and `orders`.

- `tables_sessions.table_id` references `tables.id`.
- `orders.table_session_id` references `tables_sessions.id`.
- `orders.product_id` references `products.id`.
- Foreign keys are enabled in `knexfile.ts` and `knexfile.js` with `PRAGMA foreign_keys = ON`.
- The order table stores the price at creation time, allowing totals to remain independent of later catalog changes.

---

<a name="implementation-guide"></a>

## 🧭 Implementation Guide

### Dependencies and execution

The project uses ECMAScript modules through `"type": "module"`.

```bash
npm install
npm run knex -- migrate:latest
npm run knex -- seed:run
npm run dev
```

The server uses `http://localhost:3333` when `PORT` is not defined.

### Main scripts

- `npm run dev`: runs `src/server.ts` with `tsx watch`.
- `npm run build`: removes `dist` and compiles TypeScript with `tsc`.
- `npm start`: runs `dist/server.js`.
- `npm run lint`: runs ESLint.
- `npm run format`: applies Prettier.
- `npm run check`: runs lint and formatting validation.
- `npm run knex -- migrate:latest`: applies migrations.
- `npm run knex -- seed:run`: populates products and tables.

No tests are configured; the `test` script explicitly reports `"No tests configured"`.

### Order request flow

1. A request reaches the corresponding Express router.
2. The controller validates the body or parameter with Zod when applicable.
3. The controller queries SQLite through Knex.
4. The entity is inserted, updated, or associated with another entity.
5. Known errors are converted into `AppError`.
6. The central middleware handles `AppError`, `ZodError`, and unexpected failures.

### Database configuration

Migrations are stored in `src/database/migrations` and use Knex types. Seeds are stored in `src/database/seeds`.

Separate Knex configurations exist:

- `knexfile.ts` is used by the TypeScript application.
- `knexfile.js` provides JavaScript module compatibility for the CLI.
- Both point to `./src/database/database.db`.

`requests-insomnia.yaml` contains example requests for import into Insomnia.

---

<a name="concepts-and-technologies"></a>

## 🧠 Concepts and Technologies

- **Node.js and Express 4:** server infrastructure and HTTP routing.
- **TypeScript 5 with strict mode:** compile-time typing and ES2022 configuration.
- **Zod:** validation for JSON bodies and transformed or refined parameters.
- **Knex:** query builder, migrations, seeds, and SQL query abstraction.
- **SQLite 3:** local database persisted at `src/database/database.db`.
- **ESLint 10 and Prettier:** static analysis and formatting.
- **Husky and lint-staged:** linting and formatting before commits.
- **Repository types:** global files under `src/database/types` describe entity shapes used by queries.
- **Middlewares:** centralize consistent error responses.

### Observed conventions

- Controllers are classes instantiated once by route modules.
- Async methods receive `request`, `response`, and `next`.
- Exceptions are forwarded to middleware with `next(error)`.
- Typed queries use `knex<T>("table-name")`.
- Creation responses use HTTP status `201`; reads use `200`.
- The API does not currently implement authentication or authorization.

---

<a name="technical-decisions"></a>

## ⚙️ Technical Decisions

### Responsibility separation

The application separates HTTP setup, routes, controllers, persistence, and errors. This avoids concentrating server initialization and business rules in the same module.

### SQLite with Knex

SQLite minimizes local infrastructure requirements. Knex organizes schemas, migrations, and queries without coupling controllers directly to the database driver.

### Session before order

Orders depend on an active table session. This association preserves consumption history across separate table occupancy cycles.

### Price recorded with the order

When an order is created, the system copies `product.price` into `orders.price`. This allows totals to be calculated from the price stored by the order.

### Foreign keys enabled at connection level

The `afterCreate` callback runs `PRAGMA foreign_keys = ON` for every connection created in the SQLite pool.

### Unified error middleware

The project distinguishes domain errors (`AppError`, default status `400`), Zod validation errors (`400`), and unhandled exceptions (`500`). Validation responses include Zod-generated `issues`.

---

<a name="resolved-issues"></a>

## 🧩 Resolved Issues

### Preventing duplicate sessions

Before opening a session, the controller retrieves the latest session for the table. If it does not have a `closed_at` value, the operation is blocked.

### Blocking orders on closed sessions

Order creation verifies that the session exists and that `closed_at` is empty. A closed session cannot receive new orders.

### Centralized error responses

Controllers do not need to build every exception response individually: middleware interprets known types and standardizes the JSON payload.

### Consistent consumption calculation

The total query uses `SUM(orders.price * orders.quantity)`. `COALESCE` guarantees `0` when a session has no orders.

### Updating-column compatibility

The `20261020190000_fix-orders-updated-at.ts` migration checks existing columns and renames `updated` to `updated_at`, or performs the reverse operation during rollback.

### Numeric identifier validation

Product and session endpoints convert string parameters to numbers and validate them with Zod before database operations.

---

<a name="best-practices"></a>

## 🛠️ Best Practices

- Keep validation rules close to controller entry points.
- Forward exceptions to middleware instead of sending them directly in every `catch` block.
- Use migrations to evolve the schema and include a corresponding `down` method.
- Enable critical integrations, such as foreign keys, when a connection is created.
- Record the historical price in orders.
- Use `next(error)` to avoid silent paths after exceptions.
- Run ESLint, Prettier, and lint-staged before integrating changes.
- Inspect an entity and validate its state before changing related resources.
- Handle empty aggregate results with `COALESCE`.

---

<a name="technical-learnings"></a>

## 📚 Technical Learnings

- Zod separates structural validation from domain-specific errors.
- Incremental migrations support schema fixes such as renaming `updated` to `updated_at`.
- An active database foreign key does not replace clear API-level validation.
- Aggregate SQL queries can be simplified with functions such as `SUM` and `COALESCE`.
- Global types can document record shapes without introducing an ORM layer.
- Separating `app` from `server` makes it easier to test and configure Express independently from port binding.
- Environment variables can be introduced without code changes by using `PORT` with a default value.
- Seeds provide a reproducible initial dataset for tables and products.

---

<a name="next-steps-english"></a>

## 🔄 Next Steps

- Add automated tests for controllers, validation, routes, and migrations.
- Exercise the API in an automated environment and document response formats.
- Validate that a table exists before creating a session.
- Validate `quantity` as a positive integer in order requests.
- Validate parameter IDs across every route, including `table_session_id`.
- Update global types so `closed_at` can be represented as `null`.
- Define update rules for the order `updated_at` field.
- Add pagination or filters to listings as the dataset grows.
- Add authentication and authorization if the API is exposed to external clients.
- Create complete endpoint documentation based on the Insomnia file.

---

Technical study notes by [Victor Martins](https://github.com/VictorMartinsD).
