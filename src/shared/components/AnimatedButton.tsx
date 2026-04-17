import { motion } from "motion/react";
import { useState } from "react";
import { useMagneticAnimation } from "../hooks/animation";
import { cn } from "../utils/cn";

interface AnimatedButtonProps {
  text: string;
  variant?: "default" | "pill";
  className?: string;
}

export const AnimatedButton = ({
  text,
  variant = "default",
  className,
}: AnimatedButtonProps) => {
  const { ref, springX, springY, textX, textY, handleMouseMove, reset } =
    useMagneticAnimation();

  const [pos, setPos] = useState({ x: 0, y: 0 });

  const buttonStyles = {
    default: "flex justify-center items-center rounded-full bg-black w-50 h-50",
    pill: "bg-transparent border-[0.5px] border-gray-500 px-15 py-6 h-auto text-md rounded-full",
  };

  return (
    <div
      className="cursor-pointer"
      onMouseMove={(e) => {
        handleMouseMove(e);
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseLeave={reset}
    >
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className={cn(
          "relative overflow-hidden", // IMPORTANT
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
          className="absolute size-20 bg-accent rounded-full pointer-events-none"
          style={{
            top: pos.y,
            left: pos.x,
            translateX: "-50%",
            translateY: "-50%",
          }}
          whileHover={{ zIndex: 50 }}
        />

        <motion.p
          style={{ x: textX, y: textY }}
          className="relative z-50 text-white"
        >
          {text}
        </motion.p>
      </motion.div>
    </div>
  );
};
