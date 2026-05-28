import type { MotionValue } from "motion";
import type { RefObject } from "react";

export type TransitionPhase = "intro" | "transition" | "main";

export interface ScrollAnimationReturnType {
  scrollY: MotionValue<number>;
  smoothScrollY: MotionValue<number>;
  foregroundY: MotionValue<number>;
  backgroundY: MotionValue<number>;
}

export interface MagneticAnimationReturnType {
  ref: RefObject<HTMLDivElement | null>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  textX: MotionValue<number>;
  textY: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  reset: () => void;
}

export type Project = {
  id: string;
  name: string;
  description: string;
  url: string;
  openGraphImageUrl: string;
};
