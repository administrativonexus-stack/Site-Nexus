/** Shared Motion timing constants — Capítulo 17: 200-400ms typical, never above 600ms, no elastic easing. */
export const MOTION_DURATION = {
  fast: 0.2,
  base: 0.25,
  slow: 0.4,
  max: 0.6,
} as const;

export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: MOTION_DURATION.slow, ease: MOTION_EASE } },
} as const;

export const hoverScale = {
  scale: 1.02,
  transition: { duration: MOTION_DURATION.fast, ease: MOTION_EASE },
} as const;

export const tapScale = {
  scale: 0.98,
  transition: { duration: MOTION_DURATION.fast, ease: MOTION_EASE },
} as const;
