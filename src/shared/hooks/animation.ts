import { ANIMATION_CONSTANTS } from "@/constants";
import type {
  MagneticAnimationReturnType,
  ScrollAnimationReturnType,
} from "@/shared/types";
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

  const clampedScrollY = useTransform(scrollY, (v) => Math.max(0, v));

  const foregroundY = useTransform(
    clampedScrollY,
    scrollRange,
    shouldReduceMotion ? fgY.reducedMotion : fgY.normal,
  );

  const backgroundY = useTransform(
    clampedScrollY,
    scrollRange,
    shouldReduceMotion ? bgY.reducedMotion : bgY.normal,
  );

  return {
    scrollY,
    smoothScrollY: clampedScrollY,
    foregroundY,
    backgroundY,
  };
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
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!ref.current) return;
    const touch = e.touches[0];
    if (!touch) return;

    const rect = ref.current.getBoundingClientRect();
    const originalCenterX = rect.left + rect.width / 2 - x.get();
    const originalCenterY = rect.top + rect.height / 2 - y.get();

    const touchRadius = 40;

    const onMove = (event: TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const t = event.touches[0];
      if (!t) return;
      const dx = t.clientX - originalCenterX;
      const dy = t.clientY - originalCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= touchRadius) {
        x.set(dx);
        y.set(dy);
      } else {
        const ratio = touchRadius / distance;
        x.set(dx * ratio);
        y.set(dy * ratio);
      }
    };

    const onEnd = () => {
      x.set(0);
      y.set(0);
      window.removeEventListener("touchmove", onMove, { capture: true });
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };

    window.addEventListener("touchmove", onMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);
  };

  return {
    ref,
    springX,
    springY,
    textX,
    textY,
    handleMouseMove,
    handleTouchStart,
    reset,
  };
};

export { useMagneticAnimation, useScrollAnimation };
