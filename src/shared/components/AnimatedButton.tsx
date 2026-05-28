import { motion } from "motion/react";
import { useState } from "react";
import { useMagneticAnimation } from "../hooks/animation";
import { cn } from "../utils/cn";

interface AnimatedButtonProps {
  text: string;
  variant?: "default" | "pill";
  className?: string;
  overlayClassName?: string;
  textClassName?: string;
}

export const AnimatedButton = ({
  text,
  variant = "default",
  className,
  overlayClassName = "bg-accent",
  textClassName,
}: AnimatedButtonProps) => {
  const {
    ref,
    springX,
    springY,
    textX,
    textY,
    handleMouseMove,
    handleTouchStart,
    reset,
  } = useMagneticAnimation();

  const [pos, setPos] = useState({ x: 0, y: 0 });

  const buttonStyles = {
    default: "flex justify-center items-center rounded-full bg-black w-50 h-50",
    pill: "flex justify-center items-center bg-transparent border-[0.5px] border-gray-500 px-15 py-6 h-auto text-md rounded-full",
  };

  const capturePos = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="cursor-pointer relative hover:z-10"
      onMouseEnter={capturePos}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        capturePos(e);
        reset();
      }}
      onTouchStart={handleTouchStart}
    >
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className={cn(
          "relative overflow-hidden",
          buttonStyles[variant],
          className ?? "",
        )}
      >
        <motion.div
          variants={{
            rest: { scale: 0 },
            hover: { scale: 8 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "absolute size-20 rounded-full pointer-events-none",
            overlayClassName,
          )}
          style={{
            top: pos.y,
            left: pos.x,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        <motion.p
          style={{ x: textX, y: textY }}
          className={cn("relative z-50 text-white", textClassName ?? "")}
        >
          {text}
        </motion.p>
      </motion.div>
    </div>
  );
};
