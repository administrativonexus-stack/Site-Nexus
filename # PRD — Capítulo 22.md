# PRD — Capítulo 22

# SEO Técnico, Metadata e Indexação

---

# Objetivo

Garantir que o website da Nexus seja altamente otimizado para mecanismos de busca, compartilhamento em redes sociais e indexação por IA, mantendo excelente desempenho em SEO técnico e semântico.

Este capítulo estabelece todas as diretrizes para metadata, estrutura HTML, Schema.org, Open Graph, sitemap, robots, performance SEO e boas práticas.

---

# Objetivos

- Lighthouse SEO ≥ 100
- HTML semântico
- Metadata dinâmica
- Excelente compartilhamento em redes sociais
- Estrutura preparada para IA (LLMs)
- Boa indexação no Google e Bing

---

# Estrutura de URLs

Todas as URLs devem ser curtas, legíveis e amigáveis.

## Exemplos

```
/

portfolio

/portfolio/barberflix

/portfolio/crm-nexus

/solutions

/about

/contact

/blog

/login
```

Nunca utilizar URLs com IDs ou parâmetros desnecessários.

Exemplo incorreto:

```
/project?id=25
```

---

# Metadata Global

Toda página deverá possuir:

- Title
- Description
- Keywords
- Canonical URL
- Open Graph
- Twitter Card
- Robots
- Theme Color
- Language
- Viewport

---

# Estrutura do Title

Formato padrão:

```
Página | Nexus
```

Exemplos:

```
Home | Nexus

Projetos | Nexus

CRM Inteligente | Nexus

Contato | Nexus
```

---

# Meta Description

Máximo recomendado:

155 caracteres.

Cada página deverá possuir descrição única.

Exemplo Home:

```
Desenvolvemos software, inteligência artificial e automações para empresas que desejam crescer através da tecnologia.
```

---

# Keywords

Utilizar apenas palavras relevantes.

Exemplo:

```
software

desenvolvimento web

crm

inteligência artificial

automação

next.js

aplicativos

dashboard

integrações

whatsapp

openai
```

---

# Canonical

Todas as páginas deverão possuir URL canônica.

Exemplo:

```
https://nexus.com.br/portfolio
```

---

# Open Graph

Toda página deverá conter:

```
og:title

og:description

og:image

og:url

og:type

og:locale

og:site_name
```

---

# Open Graph Image

Dimensões

```
1200x630
```

Formato

```
PNG
```

ou

```
WEBP
```

Criar imagem específica para:

- Home
- Portfólio
- Projetos
- Blog

---

# Twitter Card

Utilizar

```
summary_large_image
```

Sempre.

---

# Robots

Padrão

```
index

follow
```

Áreas privadas

```
noindex

nofollow
```

---

# Sitemap

Gerar automaticamente.

Incluir

```
/

portfolio

portfolio/*

solutions

about

contact

blog
```

Excluir

```
login

dashboard

crm

settings

profile

developer
```

---

# Robots.txt

Permitir indexação apenas das áreas públicas.

Bloquear

```
/dashboard

/crm

/settings

/profile

/portal

/admin
```

---

# Breadcrumb

Todas as páginas internas deverão possuir Breadcrumb.

Exemplo

```
Home

↓

Projetos

↓

CRM Nexus
```

---

# HTML Semântico

Utilizar corretamente

```
header

main

nav

section

article

aside

footer

figure

figcaption
```

Evitar excesso de divs.

---

# Heading Structure

Cada página possui apenas

```
1 H1
```

Hierarquia

```
H1

↓

H2

↓

H3
```

Nunca pular níveis.

---

# Schema.org

Adicionar JSON-LD.

Tipos previstos

---

## Organization

---

## Website

---

## BreadcrumbList

---

## Article

Blog

---

## SoftwareApplication

Projetos

---

## Person

Equipe (caso criada)

---

## FAQ

Página FAQ

---

# Structured Data

Cada projeto do portfólio deverá possuir

```
Nome

Descrição

Imagem

Tecnologias

Categoria

URL
```

---

# SEO para Portfólio

Cada projeto terá

```
Title próprio

Description própria

Open Graph próprio

Imagem própria

Schema próprio
```

---

# Imagens

Todas deverão possuir

```
alt
```

Descritivo.

Nunca

```
image1.png
```

Exemplo

```
Dashboard CRM Nexus mostrando gestão de leads.
```

---

# URLs

Sempre

kebab-case

Exemplo

```
crm-inteligente

landing-page-barbearia

dashboard-financeiro
```

Nunca

```
CRMInteligente

LandingPage01
```

---

# Performance SEO

Todas imagens

```
WebP

AVIF
```

Lazy Loading obrigatório.

---

# Fontes

Utilizar

```
next/font
```

Nunca importar fontes via CSS externo.

---

# Metadata Dinâmica

Projetos

Blog

Portfólio

Gerar metadata automaticamente.

---

# Core Web Vitals

Meta

LCP

< 2.5s

CLS

< 0.1

FID/INP

Excelente

---

# Internacionalização

Estrutura preparada para

```
pt-BR

en-US

es
```

Mesmo que inicialmente exista apenas português.

---

# Favicon

Gerar

```
favicon.ico

favicon.svg

apple-touch-icon

android-icon
```

---

# Manifest

Preparar para PWA.

---

# Segurança SEO

Adicionar

```
X-Robots-Tag
```

nas páginas privadas.

---

# Compartilhamento

Ao compartilhar um projeto

WhatsApp

LinkedIn

Discord

X

Facebook

A prévia deve conter:

- Imagem
- Nome
- Descrição
- URL

---

# Critérios de Aceitação

- Lighthouse SEO ≥ 100.
- Metadata completa em todas as páginas.
- Sitemap automático.
- Robots configurado.
- Schema.org válido.
- Open Graph funcional.
- Twitter Card funcional.
- HTML semântico.
- Estrutura de headings correta.
- URLs amigáveis.
- Todas as imagens com atributo alt.
- Portfólio totalmente indexável.
- Rotas privadas bloqueadas para mecanismos de busca.
