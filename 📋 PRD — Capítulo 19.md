📋 PRD — Capítulo 19
Navbar (Global Navigation)
Objetivo

A Navbar é o principal elemento de navegação da Nexus Platform.

Ela deve ser:

Elegante
Discreta
Extremamente rápida
Responsiva
Sempre acessível
Consistente em todas as páginas

Ela não deve competir com o Hero. Seu papel é orientar o usuário e facilitar a navegação.

Objetivos de UX

Em menos de 2 segundos, o visitante deve conseguir:

Identificar a marca.
Entender as principais áreas do site.
Encontrar uma forma de entrar em contato.
Acessar o Portal da Nexus.
Estrutura
┌──────────────────────────────────────────────────────────────┐

LOGO

Soluções

Projetos

Empresa

Contato

                           Entrar

└──────────────────────────────────────────────────────────────┘
Itens do Menu
Logo
Posicionada à esquerda.
Clique sempre retorna para a Home.
Versão SVG.
Preparada para tema escuro.
Soluções

Abre um Mega Menu.

Conteúdo:

Engenharia de Software
Inteligência Artificial
CRM Inteligente
Automações
Dashboards
Integrações

Cada item possui:

Ícone
Título
Descrição curta
Projetos

Leva ao Portfólio.

Empresa

Dropdown contendo:

Sobre
Processo
Carreiras (roadmap)
Blog (roadmap)
Contato

Leva diretamente para a seção de CTA ou página dedicada.

Entrar

Abre a tela de autenticação.

Após login:

Troca para avatar do usuário.

Estados da Navbar
Estado Inicial
Transparente.
Sem fundo sólido.
Sobreposta ao Hero.
Logo branca.
Links discretos.
Após Scroll

Quando o usuário rolar aproximadamente 80px:

Fundo escuro translúcido.
Blur.
Borda inferior suave.
Altura reduzida.
Sombra leve.

A transição deve durar cerca de 250ms.

Estado Mobile
Botão hambúrguer.
Menu em tela cheia (fullscreen).
Links grandes e fáceis de tocar.
CTA "Entrar" destacado.
Mega Menu

Apenas "Soluções" utilizará Mega Menu.

Estrutura:

┌─────────────────────────────────────┐

Software IA

CRM Automações

Dashboard Integrações

─────────────────────────────────────

Conheça nossos projetos →

└─────────────────────────────────────┘

O Mega Menu deve abrir com animação suave e fechar ao perder foco ou clicar fora.

Microinterações

Hover em links:

Sublinhado animado.
Mudança discreta de cor.

Hover na logo:

Leve brilho.

Botão "Entrar":

Scale 1.02.
Glow discreto.
Responsividade
Desktop

Navbar horizontal.

Tablet

Itens condensados.

Mobile

Menu lateral ou fullscreen.

Nenhum item deve ficar escondido sem alternativa.

Acessibilidade
Navegação por teclado.
Indicador de foco visível.
aria-expanded no Mega Menu.
aria-current para a página ativa.
Contraste AA.
Critérios de Aceitação
A navegação funciona em todas as resoluções.
O Mega Menu é intuitivo.
A transição de scroll é fluida.
O menu mobile mantém todas as funcionalidades.
A Navbar permanece consistente em todas as páginas.
Evolução Futura

A Navbar deve suportar novos módulos sem necessidade de redesenho:

Área do Cliente
Documentação
Academia Nexus
Marketplace
Status da Plataforma
