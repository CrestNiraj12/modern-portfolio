import { AnimatedButton } from "@/shared/components";
import { useScrollAnimation } from "@/shared/hooks/animation";
import type { Project } from "@/shared/types";
import { motion } from "motion/react";
import { Projects } from "./Projects";

interface BodyProps {
  projects: Project[];
}

export const Body = ({ projects }: BodyProps) => {
  const { foregroundY } = useScrollAnimation();

  return (
    <motion.section
      style={{ y: foregroundY }}
      className="relative flex flex-col pt-40 xl:px-40 xl:pb-20 text-black snap-y snap-mandatory will-change-transform bg-background box shadow-[100px_100px_50px_rgba(0,0,0,0.75)]"
    >
      <div className="px-20">
        <div className="flex justify-between gap-6">
          <h2 className="text-3xl/12 max-w-150">
            I transform complex ideas into powerful, user-focused products that
            give your business a real edge.
          </h2>
          <div className="flex flex-col gap-6">
            <h6 className="text-lg max-w-60">
              I thrive on solving problems through code, turning challenges into
              systems that actually make sense.
            </h6>
            <AnimatedButton text="About me" />
          </div>
        </div>
      </div>
      <Projects projects={projects} />
    </motion.section>
  );
};
