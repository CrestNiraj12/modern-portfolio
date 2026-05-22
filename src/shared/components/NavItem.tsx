import { motion } from "motion/react";
import { useMagneticAnimation } from "../hooks/animation";

interface NavItemProps {
  text: string;
}

export const NavItem = ({ text }: NavItemProps) => {
  const { ref, springX, springY, textX, textY, handleMouseMove, reset } =
    useMagneticAnimation();

  return (
    <motion.div
      ref={ref}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="relative flex items-center justify-center cursor-pointer z-50 px-6 py-2"
    >
      <motion.div style={{ x: springX, y: springY }}>
        <motion.p style={{ x: textX, y: textY }}>{text}</motion.p>
      </motion.div>
      <motion.div
        variants={{
          rest: { scale: 0 },
          hover: { scale: 1 },
        }}
        className="absolute -bottom-4 left-1/2 rounded-full w-1.5 h-1.5 bg-white"
      ></motion.div>
    </motion.div>
  );
};
