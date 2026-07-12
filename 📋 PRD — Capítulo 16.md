📋 PRD — Capítulo 16
Demonstração Interativa ("Veja a Tecnologia em Ação")
Objetivo

Criar uma seção interativa que demonstre como a Nexus conecta diferentes sistemas em uma solução única.

O objetivo não é explicar tecnicamente o funcionamento, mas permitir que o visitante visualize um fluxo completo de automação em poucos segundos.

Essa seção deve reforçar o posicionamento da Nexus como empresa de engenharia de software e IA.

Headline

Veja como a tecnologia trabalha por você.

Subheadline

Uma única interação pode iniciar uma sequência inteligente de processos totalmente automatizados.

Conceito

Em vez de um vídeo ou animação passiva, o visitante interage com uma demonstração.

Há um botão central:

▶ Executar demonstração

Ao clicar, o fluxo é executado na tela.

Fluxo da Demonstração
Cliente envia mensagem
│
▼
WhatsApp recebe
│
▼
IA interpreta a intenção
│
▼
CRM cria um Lead
│
▼
Google Calendar agenda reunião
│
▼
Dashboard recebe atualização

Cada etapa é representada por um módulo visual.

Estrutura Visual
┌──────────┐
│ WhatsApp │
└────┬─────┘
│
┌────▼─────┐
│ IA Nexus │
└────┬─────┘
│
┌────▼─────┐
│ CRM │
└─┬────┬───┘
│ │
▼ ▼
Agenda Dashboard

As conexões são desenhadas por linhas animadas.

Animação

Ao iniciar:

Um pulso percorre a linha entre os módulos.
O card ativo ganha destaque.
Um pequeno status aparece ("Mensagem recebida", "Lead criado", etc.).
Ao final, todos os módulos ficam ativos por alguns segundos antes de voltar ao estado inicial.
Estados dos Módulos

Cada módulo terá quatro estados:

Idle: aparência neutra.
Processing: brilho suave e animação.
Success: ícone de confirmação e cor de destaque.
Reset: retorna ao estado inicial.
Componentes
Animated Beam (Magic UI) para as conexões.
Motion para as transições.
shadcn/ui para os cards.
Lucide para os ícones.
Responsividade
Desktop

Fluxo completo com conexões.

Tablet

Fluxo reorganizado em duas colunas.

Mobile

Fluxo vertical com animações simplificadas.

Critérios de Aceitação

A demonstração será considerada pronta quando:

O fluxo completo for compreendido em menos de 15 segundos.
O usuário puder reiniciar a animação.
Todas as animações forem fluidas e discretas.
A performance permanecer excelente.
Por que essa seção é importante?

Ela substitui frases como:

"Fazemos automações."

por uma demonstração visual do que isso significa.

O visitante deixa de imaginar o serviço e passa a enxergar o resultado.
