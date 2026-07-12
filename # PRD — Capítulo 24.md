# PRD — Capítulo 24

# Acessibilidade (WCAG 2.2 AA)

---

# Objetivo

Garantir que toda a plataforma Nexus seja acessível para qualquer pessoa, independentemente de limitações físicas, cognitivas ou tecnológicas.

Toda interface deverá seguir as recomendações da WCAG 2.2 nível AA, proporcionando navegação intuitiva, previsível e inclusiva.

---

# Objetivos

- WCAG 2.2 AA
- Lighthouse Accessibility 100
- Navegação completa por teclado
- Compatibilidade com leitores de tela
- Alto contraste
- Feedback visual consistente

---

# Princípios

Toda interface deverá respeitar os quatro princípios fundamentais da acessibilidade.

## Perceptível

As informações devem ser facilmente percebidas.

---

## Operável

Todos os elementos devem ser utilizáveis por teclado.

---

## Compreensível

A interface deve possuir comportamento previsível.

---

## Robusto

Compatível com tecnologias assistivas atuais e futuras.

---

# HTML Semântico

Utilizar sempre elementos semânticos.

```
header

nav

main

section

article

aside

footer

button

form

label

fieldset

legend
```

Evitar utilizar `div` quando existir um elemento HTML apropriado.

---

# Navegação por Teclado

Toda funcionalidade deverá estar disponível utilizando apenas o teclado.

Fluxo esperado:

```
Tab

↓

Shift + Tab

↓

Enter

↓

Space

↓

Esc
```

Nunca criar componentes inacessíveis ao teclado.

---

# Ordem de Foco

A navegação deverá seguir a ordem visual da interface.

Nunca alterar a ordem lógica utilizando CSS.

---

# Focus Visible

Todos os elementos interativos deverão possuir indicador de foco visível.

Exemplo:

- Botões
- Links
- Campos
- Menus
- Cards clicáveis

---

# Skip Link

Adicionar link oculto no início da página.

Exemplo:

```
Pular para o conteúdo principal
```

Ao receber foco, o link deverá tornar-se visível.

---

# Contraste

Texto normal

```
Mínimo 4.5:1
```

Texto grande

```
Mínimo 3:1
```

Nunca utilizar combinações de cores que dificultem a leitura.

---

# Tipografia

Tamanho mínimo

```
16px
```

Altura de linha

```
1.5
```

Espaçamento entre parágrafos consistente.

---

# Formulários

Todos os campos deverão possuir:

- Label visível
- Placeholder opcional
- Mensagem de erro
- Mensagem de sucesso
- Descrição quando necessário

Nunca utilizar apenas placeholder como identificação.

---

# Mensagens de Erro

Devem informar claramente:

- O problema
- Como resolver
- O campo relacionado

Exemplo:

```
Informe um endereço de e-mail válido.
```

---

# ARIA

Utilizar apenas quando necessário.

Exemplos:

```
aria-label

aria-labelledby

aria-describedby

aria-expanded

aria-current

aria-hidden

aria-live
```

Nunca utilizar ARIA para substituir HTML semântico.

---

# Botões

Todo botão deverá possuir:

- Texto descritivo
- Área mínima de clique de 44x44px
- Estado de foco
- Estado desabilitado

---

# Links

Todo link deverá indicar claramente seu destino.

Evitar textos como:

```
Clique aqui
```

Preferir:

```
Conheça nossos projetos
```

---

# Imagens

Todas deverão possuir atributo:

```
alt
```

Quando decorativas:

```
alt=""
```

Nunca repetir o texto presente ao lado da imagem.

---

# Ícones

Ícones isolados deverão possuir:

```
aria-label
```

Ou texto auxiliar invisível para leitores de tela.

---

# Modais

Ao abrir:

- Foco vai para o modal
- Fundo bloqueado
- Esc fecha o modal
- Retornar foco ao elemento anterior ao fechar

---

# Dropdowns

Devem permitir navegação por teclado.

Estados obrigatórios:

- Aberto
- Fechado
- Selecionado
- Focado

---

# Mega Menu

Obrigatório:

- Navegação por teclado
- Esc para fechar
- Fechamento ao perder foco
- Indicador visual de item ativo

---

# Carrosséis

Caso utilizados:

- Controles acessíveis
- Pausar reprodução automática
- Navegação por teclado
- Indicação de slide atual

---

# Animações

Respeitar preferência do sistema:

```
prefers-reduced-motion
```

Quando ativado:

- Reduzir animações
- Remover efeitos desnecessários
- Evitar movimentos excessivos

---

# Feedback

Mudanças importantes deverão ser anunciadas.

Exemplo:

- Formulário enviado
- Login realizado
- Erro de autenticação

Utilizar regiões com:

```
aria-live="polite"
```

---

# Tempo

Nenhuma interação deverá depender exclusivamente de tempo para ser concluída.

---

# Responsividade

A acessibilidade deverá ser mantida em:

- Desktop
- Tablet
- Mobile

---

# Testes

Validar utilizando:

- Lighthouse
- Axe DevTools
- Navegação apenas por teclado
- Leitor de tela (NVDA ou VoiceOver)

---

# Componentes

Todos os componentes do Design System deverão possuir:

- Estado padrão
- Hover
- Focus
- Active
- Disabled
- Loading
- Error
- Success

---

# Critérios de Aceitação

- Lighthouse Accessibility 100.
- Compatibilidade com WCAG 2.2 AA.
- Navegação completa por teclado.
- Indicadores de foco visíveis.
- Contraste adequado em toda a interface.
- HTML semântico.
- Formulários acessíveis.
- Modais e menus acessíveis.
- Compatibilidade com leitores de tela.
- Suporte a `prefers-reduced-motion`.
- Todos os componentes reutilizáveis seguem as diretrizes de acessibilidade.
