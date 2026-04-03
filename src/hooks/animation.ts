import {
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

interface ScrollAnimationReturnType {
  scrollY: MotionValue<number>;
  smoothScrollY: MotionValue<number>;
  foregroundY: MotionValue<number>;
  backgroundY: MotionValue<number>;
}

export const useScrollAnimation = (): ScrollAnimationReturnType => {
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
