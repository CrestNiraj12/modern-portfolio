export const ANIMATION_CONSTANTS = {
  SCROLL: {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
    scrollRange: [0, 900] as [number, number],
    foregroundY: {
      reducedMotion: [0, 0] as [number, number],
      normal: [0, -220] as [number, number],
    },
    backgroundY: {
      reducedMotion: [0, 0] as [number, number],
      normal: [0, 440] as [number, number],
    },
  },

  MAGNETIC: {
    defaultStrength: 0.3,
    defaultRadius: 150,
    springStiffness: 150,
    springDamping: 15,
    textMultiplier: 0.5,
  },
} as const;

export type ScrollAnimationConstants = typeof ANIMATION_CONSTANTS.SCROLL;
export type MagneticAnimationConstants = typeof ANIMATION_CONSTANTS.MAGNETIC;

