📋 PRD — Capítulo 18
Arquitetura Front-end
Objetivo

Construir um projeto que possa crescer continuamente sem perder organização.

O website institucional será apenas uma parte da plataforma Nexus.

No futuro, a mesma aplicação poderá hospedar:

Website Institucional
Portfólio
Blog
Área do Cliente
Portal do Desenvolvedor
CRM
Dashboard Administrativo
Central de Documentação

Tudo compartilhando o mesmo Design System.

Stack Tecnológica
Camada Tecnologia
Framework Next.js (App Router)
Linguagem TypeScript
UI shadcn/ui
Estilo Tailwind CSS
Animações Motion
Componentes Visuais React Bits + Magic UI + Aceternity UI
Ícones Lucide
Backend Supabase
Autenticação Supabase Auth
Deploy Vercel
Estrutura do Projeto
src/
│
├── app/
│ ├── (marketing)/
│ │ ├── page.tsx
│ │ ├── portfolio/
│ │ ├── solutions/
│ │ ├── about/
│ │ ├── contact/
│ │ └── blog/
│ │
│ ├── (auth)/
│ │ ├── login/
│ │ ├── forgot-password/
│ │ └── reset-password/
│ │
│ ├── (portal)/
│ │ ├── dashboard/
│ │ ├── crm/
│ │ ├── developer/
│ │ ├── settings/
│ │ └── profile/
│ │
│ └── api/
│
├── components/
├── features/
├── lib/
├── hooks/
├── services/
├── types/
├── styles/
├── config/
└── assets/
Organização por Features

Ao invés de termos centenas de componentes misturados, tudo será agrupado por domínio.

features/

hero/

ecosystem/

portfolio/

authentication/

crm/

dashboard/

developer-portal/

contact/

Cada feature conterá tudo o que precisa para funcionar.

Estrutura de uma Feature
hero/

components/

hooks/

types/

utils/

constants/

animations/

index.ts

Essa organização facilita manutenção e reutilização.

Componentes Compartilhados
components/

ui/

layout/

navigation/

buttons/

cards/

forms/

feedback/

animations/

Nenhum componente específico de negócio ficará nessa pasta.

Biblioteca de Animações

Criar uma camada própria para animações reutilizáveis.

animations/

fade-up.ts

fade-left.ts

fade-right.ts

stagger.ts

floating.ts

magnetic.ts

blur.ts

Assim evitamos duplicação de código.

Sistema de Ícones

Centralizar todos os ícones.

icons/

crm.tsx

ai.tsx

dashboard.tsx

calendar.tsx

whatsapp.tsx

Evita importar diretamente o Lucide em todos os componentes.

Gerenciamento de Estado

Separar claramente:

Estado Global
Usuário autenticado.
Tema (caso exista).
Preferências.
Estado Local
Formulários.
Modais.
Animações.
Menus.

Não usar estado global para tudo.

Serviços

Toda comunicação externa ficará em uma camada dedicada.

services/

supabase/

crm/

portfolio/

contact/

calendar/

whatsapp/

Os componentes nunca chamarão APIs diretamente.

Lib

Utilitários compartilhados.

lib/

format-date.ts

cn.ts

validators.ts

seo.ts

metadata.ts
Config
config/

navigation.ts

site.ts

social.ts

animations.ts

theme.ts

Nada de strings espalhadas pelo código.

Assets
assets/

logos/

illustrations/

videos/

images/

icons/
SEO

Cada página terá sua própria configuração de metadados.

Nunca deixar tudo concentrado na Home.

Lazy Loading

Componentes pesados deverão ser carregados sob demanda.

Exemplos:

Demonstração Interativa
Globe
Vídeos
Backgrounds complexos
Segurança

As rotas do Portal serão protegidas.

/dashboard

/crm

/settings

/developer

Somente usuários autenticados terão acesso.

Estrutura das Rotas
Públicas
/

portfolio

solutions

about

contact

blog
Privadas
/dashboard

/crm

/settings

/profile

/developer
Organização do Portfólio

Cada projeto será baseado em dados.

Exemplo:

{
slug,
title,
category,
technologies,
coverImage,
gallery,
summary,
challenge,
solution,
results
}

Isso permite gerar páginas dinamicamente.

Critérios de Qualidade
Nenhum componente acima de ~250 linhas sem justificativa.
Componentes desacoplados e reutilizáveis.
Tipagem completa.
Estrutura preparada para testes.
Imports organizados.
Zero lógica de negócio misturada com apresentação.
Roadmap Técnico
Fase 1
Landing Page
Portfólio
Login
Fase 2
Portal do Cliente
Integração com CRM
Fase 3
Blog
Base de Conhecimento
Fase 4
Área do Desenvolvedor
Documentação
