import type { Project } from "@/shared/types";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SIZE = 360;
const PADDING = 20;
const VIEW_SIZE = 110;

const slideVariants = {
  enter: { y: "100%", opacity: 0 },
  center: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

interface ProjectCursorProps {
  project: Project | null;
}

export const ProjectCursor = ({ project }: ProjectCursorProps) => {
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const springX = useSpring(x, { stiffness: 350, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 350, damping: 40, mass: 0.5 });

  const trailX = useTransform<number, number>(
    [x, springX],
    ([mx, sx]: number[]) => (mx - sx) * 0.45,
  );
  const trailY = useTransform<number, number>(
    [y, springY],
    ([my, sy]: number[]) => (my - sy) * 0.45,
  );
  const viewX = useTransform(trailX, (v) => v - VIEW_SIZE / 2);
  const viewY = useTransform(trailY, (v) => v - VIEW_SIZE / 2);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!mounted) return null;

  const cursor = (
    <motion.div
      style={{
        x: springX,
        y: springY,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
        width: SIZE,
        height: SIZE,
        padding: PADDING,
      }}
      animate={{
        scale: project ? 1 : 0.6,
        opacity: project ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed left-0 top-0 z-9999 bg-gray-300 shadow-2xl rounded-2xl will-change-transform"
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200">
        <AnimatePresence initial={false}>
          {project && (
            <motion.img
              key={project.id}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              src={project.openGraphImageUrl}
              alt={project.name}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
        </AnimatePresence>

        <motion.div
          style={{
            x: viewX,
            y: viewY,
            width: VIEW_SIZE,
            height: VIEW_SIZE,
          }}
          className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center rounded-full bg-accent shadow-lg"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-white">
            View
          </span>
        </motion.div>
      </div>
    </motion.div>
  );

  return createPortal(cursor, document.body);
};
