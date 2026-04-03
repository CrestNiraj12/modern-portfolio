import { ANIMATION_CONSTANTS } from "@/constants";
import type {
  MagneticAnimationReturnType,
  ScrollAnimationReturnType,
} from "@/types";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const {
  SCROLL: {
    stiffness,
    damping,
    mass,
    scrollRange,
    foregroundY: fgY,
    backgroundY: bgY,
  },
  MAGNETIC: {
    defaultStrength,
    defaultRadius,
    springStiffness,
    springDamping,
    textMultiplier,
  },
} = ANIMATION_CONSTANTS;

const useScrollAnimation = (): ScrollAnimationReturnType => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const smoothScrollY = useSpring(scrollY, {
    stiffness,
    damping,
    mass,
  });

  const foregroundY = useTransform(
    smoothScrollY,
    scrollRange,
    shouldReduceMotion ? fgY.reducedMotion : fgY.normal,
  );

  const backgroundY = useTransform(
    smoothScrollY,
    scrollRange,
    shouldReduceMotion ? bgY.reducedMotion : bgY.normal,
  );

  return { scrollY, smoothScrollY, foregroundY, backgroundY };
};

const useMagneticAnimation = (
  strength = defaultStrength,
  radius = defaultRadius,
): MagneticAnimationReturnType => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: springStiffness,
    damping: springDamping,
  });
  const springY = useSpring(y, {
    stiffness: springStiffness,
    damping: springDamping,
  });

  const textX = useTransform(springX, (v) => v * textMultiplier);
  const textY = useTransform(springY, (v) => v * textMultiplier);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, textX, textY, handleMouseMove, reset };
};

export { useMagneticAnimation, useScrollAnimation };
