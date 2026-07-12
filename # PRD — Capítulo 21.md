# PRD — Capítulo 21

# Autenticação, Portal e Área Restrita

---

## Objetivo

Implementar uma arquitetura de autenticação segura, escalável e preparada para suportar toda a plataforma Nexus.

O sistema de autenticação será compartilhado entre todas as aplicações da plataforma, permitindo que um único login dê acesso aos módulos autorizados do usuário.

---

# Conceito

O Website Institucional e o Portal utilizarão a mesma aplicação Next.js.

O visitante navega normalmente pelas páginas públicas.

Ao autenticar-se, terá acesso às áreas privadas conforme suas permissões.

---

# Arquitetura

```text
Website Público

↓

Login

↓

Middleware

↓

Portal Nexus

↓

CRM

↓

Dashboard

↓

Área do Cliente

↓

Portal do Desenvolvedor
```

---

# Tecnologias

Framework

- Next.js App Router

Autenticação

- Supabase Auth

Sessão

- Cookies HTTP Only

Banco

- Supabase PostgreSQL

---

# Fluxo de Login

## Usuário não autenticado

Ao clicar em "Entrar"

↓

Página Login

↓

Informa email

↓

Senha

↓

Validação

↓

Redirecionamento

---

## Usuário autenticado

Ao acessar

/dashboard

middleware verifica sessão

↓

Sessão válida

↓

Permissão válida

↓

Acesso liberado

---

# Rotas Públicas

```
/

portfolio

solutions

about

contact

blog

login

forgot-password

reset-password
```

---

# Rotas Privadas

```
/dashboard

/crm

/settings

/profile

/developer

/client

/admin
```

---

# Estrutura do Portal

```
Portal

├── Dashboard
├── CRM
├── Agenda
├── IA SDR
├── Portfólio
├── Clientes
├── Configurações
├── Perfil
└── Sair
```

---

# Layout do Portal

```
┌──────────────────────────────┐

Sidebar

──────────────

Dashboard

CRM

Agenda

IA

Clientes

Configurações

──────────────

Perfil

Logout

└──────────────────────────────┘
```

---

# Dashboard Inicial

Ao entrar

Usuário visualiza:

- Últimos Leads
- Conversas
- Reuniões
- Projetos
- Indicadores
- Atividades recentes

---

# Perfis

## Administrador

Acesso total.

---

## Desenvolvedor

CRM

Projetos

Deploy

Logs

Documentação

---

## Comercial

CRM

Leads

Agenda

IA SDR

Relatórios

---

## Cliente (Roadmap)

Projetos

Financeiro

Chamados

Arquivos

Mensagens

---

# Recuperação de Senha

Fluxo

```
Email

↓

Link

↓

Nova senha

↓

Confirmação

↓

Login
```

---

# Sessão

Persistência

30 dias

Caso usuário selecione

"Lembrar de mim"

Caso contrário

7 dias

---

# Logout

Ao sair

- remover sessão
- limpar cache
- limpar estado global
- redirecionar Home

---

# Avatar

Após login

Navbar muda para:

```
🔔

👤 Rafael

▼
```

Dropdown

```
Meu Perfil

Dashboard

CRM

Configurações

Sair
```

---

# Middleware

Middleware protege

```
/dashboard

/crm

/settings

/client

/admin
```

Caso não autenticado

↓

Login

---

# Loading

Enquanto verifica sessão

Mostrar Skeleton

Nunca tela branca.

---

# Segurança

Nunca armazenar:

- Tokens em LocalStorage
- Senhas
- Dados sensíveis no Front-end

Utilizar Cookies HTTP Only sempre que possível.

---

# Estrutura de Pastas

```
app/

(auth)/

login/

forgot-password/

reset-password/

(portal)/

dashboard/

crm/

settings/

profile/

developer/
```

---

# Componentes

```
AuthGuard

LoginForm

ForgotPasswordForm

ResetPasswordForm

ProfileDropdown

ProtectedRoute

SessionProvider
```

---

# Estados

Todos formulários deverão possuir

Default

Hover

Focus

Loading

Error

Success

Disabled

---

# Responsividade

Desktop

Login dividido

50%

50%

Esquerda

Branding

Direita

Formulário

---

Tablet

60%

40%

---

Mobile

100%

Formulário centralizado.

---

# UX

Login

Máximo

2 campos

Email

Senha

Botão

Entrar

Links

Esqueci minha senha

Criar Conta (caso liberado)

---

# Acessibilidade

Campos com label

ARIA

Focus

Contraste AA

Navegação por teclado

---

# Performance

Login

Carregar em menos de:

1 segundo

---

# Critérios de Aceitação

- Login funcional.
- Middleware protegendo rotas privadas.
- Sessão persistente.
- Recuperação de senha operacional.
- Layout responsivo.
- Avatar substitui botão Entrar após autenticação.
- Estrutura preparada para expansão futura.
