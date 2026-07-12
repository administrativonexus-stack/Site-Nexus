# PRD — Capítulo 25

# CMS do Portfólio e Integração com o CRM Nexus

---

# Objetivo

Permitir que todo o conteúdo do Portfólio da Nexus seja gerenciado diretamente pelo CRM, eliminando a necessidade de alterações no código para adicionar, editar ou remover projetos.

O website institucional deverá consumir automaticamente as informações cadastradas no CRM.

---

# Conceito

O CRM será a fonte oficial de dados do Website.

Fluxo:

```
Administrador

↓

CRM Nexus

↓

Banco de Dados

↓

API

↓

Website

↓

Portfólio atualizado automaticamente
```

---

# Objetivos

- Eliminar edições manuais no código.
- Permitir publicação rápida de novos projetos.
- Centralizar todas as informações.
- Facilitar manutenção.
- Preparar o sistema para crescimento.

---

# Estrutura do Módulo

Novo módulo no CRM:

```
Conteúdo

↓

Portfólio
```

---

# Funcionalidades

Administrador poderá:

- Criar projeto
- Editar projeto
- Excluir projeto
- Duplicar projeto
- Salvar rascunho
- Publicar
- Despublicar
- Agendar publicação (Roadmap)

---

# Estrutura do Projeto

Cada projeto deverá possuir:

## Informações Gerais

- Nome
- Slug
- Categoria
- Cliente
- Status
- Data de publicação

---

## Hero

- Título
- Subtítulo
- Imagem principal
- Vídeo opcional

---

## Resumo

Texto curto apresentado no grid do Portfólio.

Máximo:

250 caracteres.

---

## Problema

Descrição do desafio do cliente.

---

## Solução

Descrição da solução desenvolvida.

---

## Resultado

Resultados obtidos.

Preparado para:

- Texto
- Indicadores
- Percentuais
- Métricas

---

## Tecnologias

Selecionadas através de lista.

Exemplo:

- Next.js
- React
- TypeScript
- Supabase
- PostgreSQL
- Docker
- OpenAI
- Claude
- Evolution API
- WhatsApp
- Meta API
- Google Calendar

---

## Galeria

Múltiplas imagens.

Ordem configurável.

---

## Vídeos

Suporte para:

- Upload
- YouTube
- Vimeo

---

## CTA

Cada projeto poderá possuir CTA próprio.

Exemplo:

```
Solicitar um projeto semelhante
```

---

# SEO

Cada projeto possuirá:

- Meta Title
- Meta Description
- Open Graph
- Keywords
- Canonical
- URL amigável

---

# Categorias

Categorias configuráveis.

Exemplo:

- CRM
- Inteligência Artificial
- Aplicativos
- Landing Pages
- Websites
- Dashboards
- Automações
- Integrações

---

# Tecnologias

Tabela própria.

Relacionamento muitos para muitos.

Preparada para expansão.

---

# Status

```
Rascunho

Publicado

Arquivado
```

---

# Ordenação

Projetos poderão ser organizados por:

- Data
- Ordem manual
- Destaque

---

# Destaque

Campo:

```
Projeto em Destaque
```

Projetos marcados aparecerão primeiro na Home.

---

# Busca

Filtros por:

- Categoria
- Tecnologia
- Cliente
- Ano
- Status

---

# Preview

Antes da publicação o administrador poderá visualizar exatamente como o projeto ficará no website.

---

# Versionamento

Cada alteração deverá gerar um histórico.

Informações registradas:

- Usuário
- Data
- Alterações realizadas

Preparado para rollback futuro.

---

# Upload de Arquivos

Tipos suportados:

Imagens

```
PNG

WEBP

AVIF

JPG
```

Vídeos

```
MP4

WEBM
```

---

# Compressão

Todas as imagens deverão ser otimizadas automaticamente durante o upload.

---

# Estrutura do Banco

Tabela principal:

```
projects
```

Relacionamentos:

```
project_gallery

project_technologies

technologies

categories
```

---

# API

Endpoints previstos:

```
GET /projects

GET /projects/:slug

GET /featured-projects

GET /categories

GET /technologies

POST /projects

PUT /projects/:id

DELETE /projects/:id
```

---

# Website

O Website nunca armazenará os projetos localmente.

Todo conteúdo será carregado através da API.

---

# Cache

Conteúdo publicado poderá utilizar cache inteligente.

Atualização automática após nova publicação.

---

# Permissões

Administrador

- Controle total

---

Editor

- Criar
- Editar
- Publicar

---

Visualizador

- Apenas leitura

---

# Dashboard

Adicionar indicadores:

- Total de projetos
- Projetos publicados
- Rascunhos
- Tecnologias mais utilizadas
- Categorias mais utilizadas

---

# Roadmap

Preparar estrutura para:

- Depoimentos
- Downloads
- PDFs
- Estudos de Caso
- Métricas reais
- Galeria de vídeos
- Integração com Blog
- Integração com Clientes

---

# Critérios de Aceitação

- CRUD completo de projetos.
- Upload de imagens e vídeos.
- SEO configurável por projeto.
- Sistema de categorias.
- Sistema de tecnologias.
- Preview antes da publicação.
- Histórico de alterações.
- API consumida pelo Website.
- Atualização automática do Portfólio.
- Estrutura preparada para futuras expansões.
