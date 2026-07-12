/**
 * Non-CSS design-system constants (Capítulo 17) — values JS code needs
 * outside of Tailwind class names (e.g. a useMediaQuery hook). Colors,
 * radius, and typography scale live in src/app/globals.css as the single
 * source of truth and are consumed via Tailwind utilities instead.
 */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  notebook: 1024,
  desktop: 1440,
} as const;

export const CONTAINER_MAX_WIDTH = 1280;
