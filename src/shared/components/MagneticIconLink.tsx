import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMagneticAnimation } from "../hooks/animation";
import { cn } from "../utils/cn";

interface MagneticIconLinkProps {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export const MagneticIconLink = ({
  href,
  label,
  children,
  className,
}: MagneticIconLinkProps) => {
  const { ref, springX, springY, textX, textY, handleMouseMove, reset } =
    useMagneticAnimation();

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(
          "size-13 rounded-full border flex items-center justify-center transition-colors",
          className ?? "",
        )}
      >
        <motion.span
          style={{ x: textX, y: textY }}
          className="flex items-center justify-center"
        >
          {children}
        </motion.span>
      </a>
    </motion.div>
  );
};
