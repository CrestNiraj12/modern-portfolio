import { cn } from "@/shared/utils/cn";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

function useScrollDownReveal(externalInView?: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [animated, setAnimated] = useState(false);
  const { scrollY } = useScroll();

  const check = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vh =
      typeof window === "undefined" ? 0 : window.innerHeight;
    const isBelow = rect.top >= vh;
    const isAbove = rect.bottom <= 0;
    if (isBelow) {
      setAnimated(false);
    } else if (!isAbove) {
      setAnimated(true);
    }
  };

  useMotionValueEvent(scrollY, "change", check);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ref,
    inView: externalInView !== undefined ? externalInView : animated,
  };
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  inView?: boolean;
}

export const RevealText = ({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  duration = 0.9,
  inView: externalInView,
}: RevealTextProps) => {
  const { ref, inView } = useScrollDownReveal(externalInView);
  const lines = text.split("\n");

  let wordCounter = 0;

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn("inline-block", className ?? "")}
    >
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((w, i) => {
              const idx = wordCounter++;
              return (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom leading-[1.15]"
                >
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={
                      inView
                        ? { y: "0%", opacity: 1 }
                        : { y: "100%", opacity: 0 }
                    }
                    transition={{
                      y: {
                        duration,
                        delay: delay + idx * stagger,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      opacity: {
                        duration: duration * 0.6,
                        delay: delay + idx * stagger,
                        ease: "easeOut",
                      },
                    }}
                    className="inline-block whitespace-pre"
                  >
                    {w}
                    {i < words.length - 1 ? " " : ""}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  once?: boolean;
  inView?: boolean;
}

export const Reveal = ({
  children,
  delay = 0,
  className,
  y = 30,
  inView: externalInView,
}: RevealProps) => {
  const { ref, inView } = useScrollDownReveal(externalInView);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ y, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y, opacity: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
