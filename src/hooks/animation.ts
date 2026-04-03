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

const useScrollAnimation = (): ScrollAnimationReturnType => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });

  const foregroundY = useTransform(
    smoothScrollY,
    [0, 900],
    shouldReduceMotion ? [0, 0] : [0, -220],
  );

  const backgroundY = useTransform(
    smoothScrollY,
    [0, 900],
    shouldReduceMotion ? [0, 0] : [0, 440],
  );

  return { scrollY, smoothScrollY, foregroundY, backgroundY };
};

const useMagneticAnimation = (
  strength = 0.3,
  radius = 150,
): MagneticAnimationReturnType => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

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

  return { ref, springX, springY, handleMouseMove, reset };
};

export { useMagneticAnimation, useScrollAnimation };
