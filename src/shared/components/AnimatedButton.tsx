import { motion } from "motion/react";
import { useMagneticAnimation } from "../hooks/animation";
import { cn } from "../utils/cn";

interface AnimatedButtonProps {
  text: string;
  className?: string;
}

export const AnimatedButton = ({ text, className }: AnimatedButtonProps) => {
  const { ref, springX, springY, textX, textY, handleMouseMove, reset } =
    useMagneticAnimation();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="cursor-pointer"
    >
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        className={cn(
          "flex justify-center items-center rounded-full bg-black w-50 h-50",
          className ? className : "",
        )}
      >
        <motion.p style={{ x: textX, y: textY }} className="text-white">
          {text}
        </motion.p>
      </motion.div>
    </div>
  );
};
