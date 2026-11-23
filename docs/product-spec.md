<div align="center">

# Especificação de Produto — api-restaurant

[![Repositório](https://img.shields.io/badge/Repositório-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/VictorMartinsD/api-restaurant)
[![Notas de Estudo](https://img.shields.io/badge/Notas%20de%20Estudo-Documentação-7c3aed?style=for-the-badge&logo=bookstack&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/docs/study-notes.md)
[![License: MIT](https://img.shields.io/badge/Licença-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/LICENSE)

</div>

<a id="sumario"></a>

<div align="center">

## Sumário | Summary

| Português | English |
| --- | --- |
| [Visão Geral do Produto](#visao-geral-do-produto)<br>[Problema](#problema)<br>[Objetivo do Produto](#objetivo-do-produto)<br>[Usuário-Alvo](#usuario-alvo)<br>[Funcionalidades](#funcionalidades)<br>[Regras de Negócio](#regras-de-negocio)<br>[Fluxo do Usuário](#fluxo-do-usuario)<br>[MVP](#mvp)<br>[Decisões de Produto](#decisoes-de-produto)<br>[Limitações Atuais](#limitacoes-atuais)<br>[Próximos Passos](#proximos-passos-roadmap)<br>[Métricas de Sucesso](#metricas-de-sucesso) | [Product Overview](#product-overview)<br>[Problem](#problem)<br>[Product Objective](#product-objective)<br>[Target User](#target-user)<br>[Features](#features)<br>[Business Rules](#business-rules)<br>[User Flow](#user-flow)<br>[MVP](#mvp-english)<br>[Product Decisions](#product-decisions)<br>[Current Limitations](#current-limitations)<br>[Next Steps](#next-steps-english)<br>[Success Metrics](#success-metrics) |

</div>

<a id="visao-geral-do-produto"></a>

## 1 — Visão Geral do Produto

O api-restaurant organiza o atendimento presencial de um restaurante em torno de mesas, produtos, sessões de atendimento e pedidos. O sistema permite que a equipe mantenha o catálogo disponível, acompanhe quais mesas estão em atendimento, registre o consumo de cada mesa e consulte o total acumulado da conta.

O valor entregue é a centralização do ciclo operacional de uma mesa. Cada pedido fica associado ao atendimento correto, e o consumo pode ser consultado antes do encerramento da sessão.

<a id="problema"></a>

## 2 — Problema

Sem um registro único do atendimento, a equipe pode perder a relação entre mesa, itens consumidos e valor da conta. Isso dificulta acompanhar pedidos durante a permanência do cliente, identificar mesas ocupadas e finalizar o atendimento com um total consolidado.

O produto resolve essa dificuldade ao organizar o atendimento por sessões de mesa e ao vincular cada item lançado à sessão correspondente.

<a id="objetivo-do-produto"></a>

## 3 — Objetivo do Produto

Permitir que a equipe do restaurante:

- consulte as mesas disponíveis para atendimento;
- abra uma sessão para uma mesa ocupada;
- registre os produtos e as quantidades consumidas;
- acompanhe os itens lançados e o total da sessão;
- encerre o atendimento e libere a mesa para um novo ciclo.

<a id="usuario-alvo"></a>

## 4 — Usuário-Alvo

O usuário principal é a equipe operacional de um restaurante, especialmente atendentes e responsáveis pelo controle das mesas. É um usuário que precisa registrar informações de atendimento com rapidez e não deve depender de conhecimento técnico para entender o estado de uma mesa ou o valor consumido.

Administradores ou responsáveis pelo cardápio também utilizam o produto para cadastrar, consultar, alterar e remover produtos disponíveis.

<a id="funcionalidades"></a>

## 5 — Funcionalidades

### Catálogo de produtos

- O responsável informa o nome e o preço de um produto.
- O sistema valida os dados e disponibiliza o produto no catálogo.
- A equipe pode consultar todos os produtos ou filtrar a consulta pelo nome.
- O responsável pode alterar o nome e o preço de um produto existente.
- O responsável pode remover um produto do catálogo.

### Controle de mesas

- A equipe consulta a lista de mesas cadastradas em ordem numérica.
- O sistema mantém o histórico dos atendimentos iniciados para cada mesa.
- A equipe abre uma nova sessão para registrar o atendimento de uma mesa.
- A equipe encerra uma sessão quando o atendimento termina.

### Registro de pedidos

- A equipe informa a sessão, o produto e a quantidade consumida.
- O sistema associa o item à sessão de mesa ativa.
- A equipe consulta os itens de uma sessão em ordem dos lançamentos mais recentes.
- O sistema apresenta o total financeiro e a quantidade acumulada da sessão.

### Estados do atendimento

- Uma sessão aberta representa uma mesa em atendimento.
- Uma sessão fechada representa um atendimento encerrado.
- Uma mesa não pode iniciar outra sessão enquanto já possuir um atendimento aberto.
- Pedidos não podem ser lançados em uma sessão fechada.

<a id="regras-de-negocio"></a>

## 6 — Regras de Negócio

- O nome do produto é obrigatório e deve conter pelo menos quatro caracteres após a remoção de espaços nas extremidades.
- O preço do produto é obrigatório e deve ser maior que zero.
- Apenas produtos existentes podem ser incluídos em pedidos.
- Apenas sessões existentes podem receber pedidos.
- Uma sessão fechada não aceita novos pedidos.
- Uma mesa não pode ter mais de uma sessão aberta ao mesmo tempo.
- Uma sessão inexistente não pode ser encerrada.
- Uma sessão já encerrada não pode ser encerrada novamente.
- O preço registrado no pedido é o preço vigente no momento do lançamento.
- Alterações posteriores no catálogo não modificam o preço dos pedidos já registrados.
- O total da sessão é calculado pela soma do preço registrado de cada pedido multiplicado pela respectiva quantidade.
- Uma sessão sem pedidos retorna total financeiro e quantidade acumulada iguais a zero.
- O sistema rejeita dados que não atendam ao formato esperado e informa que ocorreu um erro de validação.
- A quantidade precisa ser informada como número; o produto ainda não impõe uma regra de quantidade inteira e positiva.

<a id="fluxo-do-usuario"></a>

## 7 — Fluxo do Usuário

1. A equipe consulta as mesas disponíveis.
2. Ao iniciar um atendimento, a equipe abre uma sessão para a mesa escolhida.
3. A equipe consulta o catálogo e, se necessário, filtra os produtos pelo nome.
4. A equipe registra cada item consumido, informando produto e quantidade.
5. O sistema confirma que a sessão está aberta e que o produto existe antes de registrar o pedido.
6. A equipe consulta a lista de pedidos e o total acumulado da sessão.
7. Ao finalizar o atendimento, a equipe encerra a sessão.
8. A mesa fica apta a iniciar um novo atendimento.

<a id="mvp"></a>

## 8 — MVP

O núcleo do produto é o controle do consumo por sessão de mesa. Sem a possibilidade de abrir uma sessão, registrar pedidos vinculados a ela e consultar seu total, o sistema não cumpre o objetivo de organizar o atendimento e o fechamento da conta.

O catálogo de produtos e o cadastro de mesas sustentam esse núcleo, mas o ciclo de atendimento é a funcionalidade que define o produto.

<a id="decisoes-de-produto"></a>

## 9 — Decisões de Produto

- **Organizar o atendimento por sessões:** separa ciclos diferentes da mesma mesa e evita misturar consumos de atendimentos anteriores.
- **Bloquear uma segunda sessão aberta:** preserva um único estado de atendimento por mesa e reduz ambiguidades para a equipe.
- **Permitir pedidos somente em sessões abertas:** impede que o consumo seja alterado depois do encerramento da conta.
- **Guardar o preço no momento do pedido:** mantém a consistência histórica da conta mesmo quando o preço do catálogo muda.
- **Exibir itens e total separadamente:** permite conferir tanto os lançamentos quanto o valor consolidado antes de encerrar a sessão.
- **Permitir consulta por nome no catálogo:** reduz o esforço para localizar um produto em uma lista maior.

<a id="limitacoes-atuais"></a>

## 10 — Limitações Atuais

- Não há autenticação, perfis ou separação de permissões entre atendentes e responsáveis pelo catálogo.
- Não há interface visual própria; o uso depende de um consumidor da API.
- Não há fluxo de pagamento ou confirmação de recebimento da conta.
- Não há edição ou remoção de pedidos já lançados.
- Não há suporte explícito a descontos, taxas, gorjetas ou divisão da conta.
- A quantidade do pedido não é restringida a valores inteiros e positivos.
- Não há notificações, relatórios ou indicadores operacionais.
- Não há integração com estoque, caixa, impressão ou serviços externos.
- Não há funcionalidade para criar ou editar o cadastro de mesas pelo fluxo do produto.

<a id="proximos-passos-roadmap"></a>

## 11 — Próximos Passos (Roadmap)

- Validar quantidades como inteiros positivos.
- Adicionar edição e cancelamento controlado de pedidos.
- Registrar pagamento e formas de encerramento da conta.
- Incluir descontos, taxas, gorjetas e divisão de conta.
- Adicionar autenticação e permissões por função.
- Criar uma interface para atendimento e gestão do catálogo.
- Disponibilizar histórico, relatórios e indicadores de operação.
- Integrar o atendimento com estoque, caixa e impressão de pedidos.

<a id="metricas-de-sucesso"></a>

## 12 — Métricas de Sucesso

- A equipe consegue abrir uma sessão, registrar um pedido e consultar o total sem precisar repetir informações.
- Os pedidos consultados permanecem associados à mesa e à sessão corretas.
- O atendimento é encerrado sem deixar sessões abertas indevidamente.
- O total apresentado corresponde aos itens e preços registrados na sessão.
- O número de tentativas rejeitadas por mesa já ocupada ou sessão fechada diminui.
- O tempo entre o início do atendimento e o registro do primeiro pedido diminui.
- A equipe consegue localizar produtos pelo nome e concluir o lançamento com poucas interações.

---

Documento de produto elaborado por [Victor Martins](https://github.com/VictorMartinsD).

Este documento descreve a visão funcional e estratégica do sistema.

---

<div align="center">

## ENGLISH VERSION

# Product Specification — api-restaurant

[![Repository](https://img.shields.io/badge/Repository-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/VictorMartinsD/api-restaurant)
[![Study Notes](https://img.shields.io/badge/Study%20Notes-Documentation-7c3aed?style=for-the-badge&logo=bookstack&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/docs/study-notes.md)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/VictorMartinsD/api-restaurant/blob/main/LICENSE)

</div>

<a id="product-overview"></a>

## 1 — Product Overview

api-restaurant organizes a restaurant's in-person service around tables, products, service sessions, and orders. The system allows the team to maintain the available catalog, track which tables are being served, record each table's consumption, and view the accumulated bill total.

The value delivered is the centralization of a table's operational cycle. Each order is associated with the correct service session, and consumption can be reviewed before the session is closed.

<a id="problem"></a>

## 2 — Problem

Without a single service record, the team can lose the relationship between a table, its consumed items, and the bill amount. This makes it harder to track orders while customers are present, identify occupied tables, and finish the service with a consolidated total.

The product addresses this difficulty by organizing service into table sessions and linking every item to the corresponding session.

<a id="product-objective"></a>

## 3 — Product Objective

Enable the restaurant team to:

- view the tables available for service;
- open a session for an occupied table;
- record consumed products and quantities;
- review the items entered and the session total;
- close the service and make the table available for a new cycle.

<a id="target-user"></a>

## 4 — Target User

The primary users are restaurant operations staff, especially servers and team members responsible for table control. They need to record service information quickly and should not need technical knowledge to understand a table's status or accumulated amount.

Administrators or team members responsible for the menu also use the product to create, view, update, and remove available products.

<a id="features"></a>

## 5 — Features

### Product catalog

- The responsible user enters a product name and price.
- The system validates the data and makes the product available in the catalog.
- The team can view all products or filter the list by name.
- The responsible user can update the name and price of an existing product.
- The responsible user can remove a product from the catalog.

### Table control

- The team views the registered tables in numerical order.
- The system keeps the history of sessions started for each table.
- The team opens a new session to record a table's service.
- The team closes a session when service ends.

### Order recording

- The team provides the session, product, and consumed quantity.
- The system associates the item with the active table session.
- The team views a session's items with the most recent entries first.
- The system displays the session's accumulated monetary total and quantity.

### Service states

- An open session represents a table currently being served.
- A closed session represents completed service.
- A table cannot start another session while it already has an open service.
- Orders cannot be added to a closed session.

<a id="business-rules"></a>

## 6 — Business Rules

- A product name is required and must contain at least four characters after trimming leading and trailing spaces.
- A product price is required and must be greater than zero.
- Only existing products can be added to orders.
- Only existing sessions can receive orders.
- A closed session does not accept new orders.
- A table cannot have more than one open session at the same time.
- A nonexistent session cannot be closed.
- A session that is already closed cannot be closed again.
- The price recorded on an order is the price in effect when the order is placed.
- Later catalog changes do not modify the price of previously recorded orders.
- The session total is calculated by summing each order's recorded price multiplied by its quantity.
- A session with no orders returns zero for both monetary total and accumulated quantity.
- The system rejects data that does not match the expected format and reports a validation error.
- The quantity must be provided as a number; the product does not yet require a positive integer quantity.

<a id="user-flow"></a>

## 7 — User Flow

1. The team views the available tables.
2. When service begins, the team opens a session for the selected table.
3. The team views the catalog and, if necessary, filters products by name.
4. The team records each consumed item by providing its product and quantity.
5. The system confirms that the session is open and the product exists before recording the order.
6. The team views the session's order list and accumulated total.
7. When service ends, the team closes the session.
8. The table becomes available for a new service cycle.

<a id="mvp-english"></a>

## 8 — MVP

The product's core is consumption control by table session. Without the ability to open a session, record orders linked to it, and view its total, the system would not fulfill its purpose of organizing service and bill closing.

The product catalog and table registry support this core, but the service cycle is what defines the product.

<a id="product-decisions"></a>

## 9 — Product Decisions

- **Organizing service by sessions:** separates different cycles for the same table and prevents previous consumption from being mixed with a new service.
- **Blocking a second open session:** preserves a single service state per table and reduces ambiguity for the team.
- **Allowing orders only in open sessions:** prevents consumption from being changed after service is closed.
- **Storing the price when the order is placed:** preserves the bill's historical consistency when catalog prices change.
- **Showing items and the total separately:** allows the team to review both entries and the consolidated amount before closing the session.
- **Allowing catalog searches by name:** reduces the effort required to find a product in a larger list.

<a id="current-limitations"></a>

## 10 — Current Limitations

- There is no authentication, user profile, or permission separation between servers and catalog managers.
- There is no built-in visual interface; use depends on an API consumer.
- There is no payment flow or confirmation of bill settlement.
- Existing orders cannot be edited or removed.
- Discounts, fees, tips, and bill splitting are not supported explicitly.
- Order quantity is not restricted to positive integer values.
- Notifications, reports, and operational indicators are not available.
- There is no integration with inventory, cash register, printing, or external services.
- The product flow does not include creating or editing the table registry.

<a id="next-steps-english"></a>

## 11 — Next Steps

- Validate quantities as positive integers.
- Add controlled order editing and cancellation.
- Record payment and bill closing methods.
- Include discounts, fees, tips, and bill splitting.
- Add authentication and role-based permissions.
- Create an interface for service and catalog management.
- Provide history, reports, and operational indicators.
- Integrate service with inventory, cash register, and order printing.

<a id="success-metrics"></a>

## 12 — Success Metrics

- The team can open a session, record an order, and view the total without re-entering information.
- Viewed orders remain associated with the correct table and session.
- Service is closed without leaving sessions open unintentionally.
- The displayed total matches the items and prices recorded in the session.
- The number of rejected attempts caused by an occupied table or closed session decreases.
- The time between starting service and recording the first order decreases.
- The team can find products by name and complete an order entry with few interactions.

---

Product document prepared by [Victor Martins](https://github.com/VictorMartinsD).

This document describes the functional and strategic vision of the system.
