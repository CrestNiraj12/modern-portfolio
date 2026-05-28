import { cn } from "@/shared/utils/cn";
import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export const RevealText = ({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  duration = 0.9,
  once = true,
}: RevealTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.1 });
  const lines = text.split("\n");

  let wordCounter = 0;

  return (
    <span ref={ref} className={cn("inline-block", className ?? "")}>
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
                    {i < words.length - 1 ? " " : ""}
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
}

export const Reveal = ({
  children,
  delay = 0,
  className,
  y = 30,
  once = true,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ y, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y, opacity: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
