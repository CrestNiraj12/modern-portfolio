import { greetings } from "@/constants";
import { Body, Header } from "@/features/Home/components";
import type { Project } from "@/shared/types";
import { cn } from "@/shared/utils/cn";
import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

interface HomeProps {
  projects: Project[];
}

export default function Home({ projects }: HomeProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "transition" | "main">("intro");
  const velocity = useMotionValue(0);

  useEffect(() => {
    if (index < greetings.length) {
      const timer = setTimeout(
        () => setIndex((i) => i + 1),
        index === 0 ? 500 : 150,
      );
      return () => clearTimeout(timer);
    } else if (phase === "intro") {
      const timer = setTimeout(() => setPhase("transition"), 250);
      return () => clearTimeout(timer);
    }
  }, [index, phase]);

  useEffect(() => {
    if (phase !== "transition") {
      return;
    }

    const timer = setTimeout(() => setPhase("main"), 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative min-h-screen w-screen bg-black snap-y snap-mandatory">
      {phase !== "intro" && (
        <motion.div
          initial={{ y: "10%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className={cn(
            "z-20",
            phase === "transition"
              ? "absolute inset-0 overflow-hidden"
              : "relative",
          )}
        >
          <Header velocity={velocity} />
          <Body projects={projects} />
        </motion.div>
      )}

      {phase !== "main" && (
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: phase === "transition" ? "-100%" : 0,
            borderRadius: phase === "transition" ? "50%" : "0%",
          }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-30 flex items-center justify-center bg-black"
        >
          <h1 className="text-4xl font-bold text-white animate-fadeOut">
            {greetings[Math.min(index, greetings.length - 1)]}
          </h1>
        </motion.div>
      )}
    </div>
  );
}
