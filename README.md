# API Restaurant 🍽️

> **Status do Projeto:** 🚧 Em desenvolvimento ativo. Este repositório está sendo construído para estruturar um backend robusto de gerenciamento de pedidos e atendimento de mesas.

---

## 📋 Sobre o Projeto

O **API Restaurant** é uma aplicação backend projetada para automatizar o fluxo de atendimento presencial em estabelecimentos gastronômicos. O sistema gerencia o ciclo de vida operacional de um restaurante, contemplando desde o catálogo de produtos e abertura de mesas até o registro de pedidos e o fechamento de contas com cálculo de consumo.

Desenvolvido com foco em boas práticas de arquitetura de software, modelagem relacional de banco de dados e padronização de APIs RESTful.

---

## 🔄 Fluxo da Aplicação

1. **Abertura de Mesa:** Quando um cliente chega e se acomoda, uma sessão de atendimento é iniciada, associando a ocupação à mesa correspondente.
2. **Lançamento de Pedidos:** Durante a permanência, os itens consumidos (pratos, bebidas, porções) são vinculados diretamente à sessão ativa daquela mesa.
3. **Encerramento da Conta:** Ao finalizar a consumação, a mesa é fechada, calculando o valor total consolidado e liberando a mesa para um novo ciclo de atendimento.

---

## 🗄️ Modelagem de Dados (Banco de Dados)

A arquitetura relacional da aplicação é composta pelas seguintes entidades principais:

- **`tables`:** Cadastro e identificação das mesas físicas do restaurante.
- **`products`:** Catálogo de itens disponíveis para consumo (nome, descrição, preço, etc.).
- **`session_tables`:** Controle do ciclo de abertura e fechamento de mesas (histórico de uso e ocupação).
- **`orders`:** Registro dos pedidos realizados vinculados às respectivas sessões de atendimento e produtos consumidos.

---

## 🛠️ Tecnologias Previstas

- **Node.js** com **Express**
- **TypeScript**
- Banco de dados relacional com suporte a migrações e relacionamentos

---

## 📌 Próximos Passos

- [ ] Configuração inicial do ambiente e rotas base.
- [ ] Implementação das migrações do banco de dados (`tables`, `products`, `session_tables`, `orders`).
- [ ] Desenvolvimento dos controladores para abertura/fechamento de mesas e lançamento de pedidos.
- [ ] Documentação dos endpoints da API.
