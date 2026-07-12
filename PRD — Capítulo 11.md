PRD — Capítulo 11
Hero Section
Objetivo

O Hero é responsável por criar a primeira impressão da Nexus.

Ele deve comunicar imediatamente:

Engenharia de Software
Inteligência Artificial
Automação
Tecnologia Premium

Sem depender de muito texto.

O usuário deve compreender visualmente que a Nexus desenvolve soluções completas para empresas.

Emoção que queremos transmitir

O visitante deve sentir:

Confiança
Curiosidade
Sofisticação
Modernidade

Nunca:

Excesso de informação
Sensação de template
Aparência de agência de marketing
Estrutura
┌──────────────────────────────────────────────────────┐

Navbar

────────────────────────────────────────────────────────

        Texto               Mockup CRM

────────────────────────────────────────────────────────

Scroll Indicator

└──────────────────────────────────────────────────────┘
Altura

Sempre:

100vh

Nunca menor.

O Hero deve ocupar toda a primeira tela.

Layout Desktop
┌───────────────────────────────────────────────┐

         45%               55%

Texto Mockup

└───────────────────────────────────────────────┘
Layout Mobile
Texto

↓

Botões

↓

Mockup

↓

Scroll

Nunca lado a lado.

Background

Biblioteca:

React Bits

Componente:

Dot Field

Este será o background principal.

Configuração

O Dot Field deve:

ocupar toda a tela;
possuir baixa opacidade;
reagir levemente ao movimento do cursor;
permanecer atrás de todo o conteúdo;
não competir com o texto.

A sensação desejada é de uma rede de dados viva.

Segunda camada

Adicionar um Radial Gradient extremamente discreto.

Centro da tela:

ligeiramente mais claro.

Bordas:

quase pretas.

Terceira camada

Adicionar um leve Noise.

Objetivo:

evitar superfícies totalmente lisas.

Navbar

Sobreposta ao Hero.

Transparente.

Sem fundo.

Após scroll:

blur
background escuro
borda inferior suave
Conteúdo
Badge

Pequena.

Exemplo:

⚡ Engenharia de Software + IA
Headline

Máximo:

3 linhas.

Exemplo:

Construímos software
que impulsiona
empresas.

Nunca usar frases longas.

Subheadline

Explicar rapidamente.

Exemplo:

Desenvolvemos sistemas,
automações e inteligência artificial
para transformar operações em crescimento.

Máximo:

duas linhas.

Botões

Dois CTAs.

Primário

Agendar uma reunião

Secundário

Conhecer projetos
Mockup

O lado direito NÃO será uma imagem estática.

Será um mockup vivo.

Conteúdo do mockup

Dashboard Nexus.

Mostrar:

CRM

Conversas

IA

Agenda

Analytics

Sem excesso de detalhes.

Movimento

Muito lento.

Float.

Apenas:

translateY

entre:

6px

e

10px

Loop infinito.

Rotação

Leve.

rotate

-2°

até

2°

Nunca exagerada.

Glow

Muito discreto.

Apenas atrás do mockup.

Nunca azul extremamente forte.

Texto Animado

Biblioteca:

React Bits

Componente:

Split Text

ou

Blur Text

A animação deve acontecer apenas na primeira visita.

Nunca repetir durante a navegação.

Entrada

Sequência:

Badge

↓

Headline

↓

Descrição

↓

Botões

↓

Mockup

↓

Scroll Indicator

Scroll Indicator

Pequeno.

Minimalista.

Fica centralizado.

Animação:

sobe

↓

desce

↓

loop

Responsividade

Desktop

Texto ocupa cerca de 45%.

Mockup ocupa cerca de 55%.

Tablet

Texto primeiro.

Mockup reduzido.

Mobile

Mockup abaixo dos botões.

Performance

O Hero deve carregar rapidamente.

Regras:

nenhuma imagem maior que o necessário;
animações executadas na GPU (transform e opacity);
evitar efeitos pesados de blur;
manter o background leve.
Componentes
Elemento Biblioteca
Dot Field React Bits
Texto Animado React Bits
Botões shadcn/ui
Motion Motion
Ícones Lucide
Navbar Custom
Critérios de Aceitação

O Hero será considerado pronto quando:

O título estiver legível em todas as resoluções.
O mockup não prejudicar a leitura.
O background não competir com o conteúdo.
O carregamento inicial for fluido.
O visitante entender, em poucos segundos, que a Nexus desenvolve software, IA e automações.
Os botões estiverem claramente destacados e conduzirem para os próximos passos.
