---
description: "Principios de diseño visual y de marca aplicados al editar componentes Svelte. Cubre tokens, tipografía, motion, accesibilidad y jerarquía."
applyTo: "src/**/*.svelte"
---

# Svelte Design Principles

Aplica estos principios cada vez que crees o modifiques un componente Svelte. Son los mismos que sigue el agente `Brand Frontend Designer`.

## Tokens antes que valores literales
- Usa variables de `src/styles/tokens.css` (colores, espaciado, tipos, easings) en lugar de hardcodear hex o px cuando el token exista.
- Si un valor literal es inevitable, coméntalo: `/* one-off: hero parallax offset */`.
- Un token nuevo se añade a `tokens.css` — nunca se define inline dentro de un componente.

## Svelte 5 idiomático
- **Runes siempre:** `$state`, `$derived`, `$effect`, `$props`. Nada de `export let` ni `$:`.
- Props tipadas: `let { title, variant = 'primary' }: Props = $props();`.
- Eventos nativos: `onclick={...}` (no `on:click`).
- Transiciones: prefiere `transition:` y `animate:` nativos antes que librerías.

## Jerarquía y tipografía
- Un H1 por vista. Eyebrow en mono/caps opcional encima.
- Escala fluida con `clamp()`; no uses `font-size` fijos para display.
- Leading (`line-height`) entre 1.1–1.2 en display, 1.5–1.65 en texto.
- Numerales tabulares (`font-variant-numeric: tabular-nums`) en métricas y datos.

## Color
- Un acento dominante por sección. Nunca 3 neones luchando en la misma vista.
- Contraste AA mínimo (4.5:1 texto normal, 3:1 texto grande). El hook `contrast-check` te avisará si lo rompes.
- Fondos no-negro-puro preferidos (`#0A0A0F` > `#000`). Textos no-blanco-puro (`#F5F5F7` > `#FFF`).

## Motion
- Entradas entre 200–500ms. Nunca >600ms.
- Easings de marca: `--ease-spring` para micro-interacciones, `--ease-out-expo` para entradas.
- Envuelve cualquier motion no-esencial en `@media (prefers-reduced-motion: reduce) { ... }` con fallback estático.
- Stagger entre elementos: 40–80ms entre hijos, no más.

## Accesibilidad
- `:focus-visible` con outline visible (nunca `outline: none` sin sustituto).
- Targets interactivos ≥44×44px en mobile.
- `aria-label` en iconos-botón sin texto. `alt=""` en imágenes decorativas, descriptivo en el resto.
- Contraste validado — el hook lo verifica en `color` + `background(-color)` dentro del mismo bloque.

## Layout
- Mobile-first: empieza el `<style>` con los estilos base, sube con `@media (min-width: …)`.
- Grid antes que flex para layouts 2D. Flex para 1D.
- Evita alturas fijas. Usa `min-height`, `aspect-ratio` y padding generoso.

## Anti-patterns
- `style="..."` inline en el template (salvo valores dinámicos via `style:prop={value}`).
- `!important` fuera de resets o utilidades.
- Animar `width`/`height`/`top`/`left` — usa `transform` y `opacity`.
- Nesting de `<style>` >3 niveles.
