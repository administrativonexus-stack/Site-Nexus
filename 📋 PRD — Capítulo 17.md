📋 PRD — Capítulo 17
Nexus Design System
Filosofia

A Nexus não utiliza componentes decorativos.

Cada elemento existe porque melhora a experiência.

Nosso objetivo é transmitir:

Engenharia
Organização
Inteligência
Performance
Precisão

Nunca:

Exagero
Marketing chamativo
Poluição visual
Design Principles 1.

Menos é mais.

Sempre.

2.

Interface antes de decoração.

3.

Movimento deve comunicar.

Nunca apenas enfeitar.

4.

Espaço em branco faz parte do design.

5.

Todo componente deve parecer premium.

Grid

Desktop

1440px

Container

max-width: 1280px

Padding

Desktop

120px

Tablet

64px

Mobile

24px
Espaçamentos

Usaremos uma escala de 8px.

4

8

16

24

32

40

48

64

80

96

120

160

Nunca utilizar valores aleatórios.

Radius

Pequeno

8px

Médio

16px

Grande

24px

Hero

32px
Bordas

Sempre

1px solid rgba(255,255,255,.08)
Sombras

Muito leves.

Jamais sombras pesadas.

Cores
Background
#09090B
Surface
#111113
Surface Hover
#17171A
Primary
#6C63FF
Primary Hover
#7A73FF
Success
#22C55E
Warning
#F59E0B
Danger
#EF4444
Texto

Primary

#FFFFFF

Secondary

#A1A1AA

Muted

#71717A
Tipografia

Fonte

Geist

Fallback

Inter

Hierarquia

Hero

72px

Título

48px

Subtítulo

24px

Texto

18px

Descrição

16px

Legenda

14px

Botões

Altura

48px

Radius

14px

Padding

Horizontal

24px

Botão Primário

Background

Primary

Texto

Branco

Hover

2% maior

Sombra discreta

Botão Secundário

Transparente

Borda

Hover

Surface Hover

Cards

Todos os cards seguem a mesma estrutura.

╭────────────────────────╮

Ícone

Título

Descrição

Ação

╰────────────────────────╯

Nunca utilizar layouts diferentes sem justificativa.

Ícones

Biblioteca

Lucide

Tamanho

20

24

32

Nunca misturar bibliotecas.

Motion Design

Toda animação possui propósito.

Entrada

Fade

TranslateY

16px

Hover

Scale

1.02

Click

Scale

0.98

Duration

200ms

250ms

400ms

Nunca acima de:

600ms

Curvas

Usar easing suave.

Nada "elástico".

Scroll

As animações acontecem apenas uma vez.

Nunca repetir infinitamente durante a navegação.

Navbar

Sempre:

Glass.

Blur.

Transparente.

Após scroll:

Surface.

Hero

Dot Field

Radial Gradient

Noise

Componentes

Base

shadcn/ui

Animações

Motion

Background

React Bits

Fluxos

Magic UI

Hover

Aceternity

Performance

Meta.

Lighthouse.

Performance

100

SEO

100

Accessibility

100

Best Practices

100
Responsividade

Desktop First.

Mas Mobile recebe o mesmo cuidado.

Não esconder componentes.

Adaptar.

UX

Cada seção responde apenas uma pergunta.

Nunca duas.

Exemplo.

Hero

↓

Quem somos?

Ecossistema

↓

Como funciona?

Portfólio

↓

O que construímos?

CTA

↓

Como contratar?

Estados

Todo componente precisa possuir.

Default

Hover

Focus

Active

Disabled

Loading

Success

Error

Código

Todos os componentes deverão ser:

Reutilizáveis.

Tipados.

Separados.

Documentados.

Naming

Exemplo.

Hero.tsx

HeroButtons.tsx

HeroBackground.tsx

PortfolioCard.tsx

SolutionCard.tsx

Nunca componentes gigantes.

Estrutura
components/

hero/

portfolio/

ecosystem/

navbar/

footer/

buttons/

cards/

animations/
