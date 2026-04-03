import type { MotionValue } from "motion";
import type { Ref } from "react";

export interface ScrollAnimationReturnType {
  scrollY: MotionValue<number>;
  smoothScrollY: MotionValue<number>;
  foregroundY: MotionValue<number>;
  backgroundY: MotionValue<number>;
}

export interface MagneticAnimationReturnType {
  ref: Ref<HTMLDivElement>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent) => void;
  reset: () => void;
}
