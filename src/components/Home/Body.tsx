import { Divider } from "@/components";
import { useScrollAnimation } from "@/hooks/animation";
import { motion } from "motion/react";

export const Body = () => {
  const { foregroundY } = useScrollAnimation();

  return (
    <motion.section
      style={{ y: foregroundY }}
      className="relative flex flex-col p-40 text-black will-change-transform bg-background"
    >
      <div className="px-20">
        <div className="flex justify-between">
          <h2 className="text-3xl/12 w-150">
            I transform complex ideas into powerful, user-focused products that
            give your business a real edge.
          </h2>
          <h6 className="text-md w-60">
            I thrive on solving problems through code, turning challenges into
            systems that actually make sense.
          </h6>
        </div>
        <div className="flex w-full justify-between items-end">
          <h6 className="text-sm text-gray-500 uppercase">Recent Work</h6>
          <div className="flex justify-center items-center rounded-full bg-black w-50 h-50">
            <p className="text-white">About Me</p>
          </div>
        </div>
      </div>
      <Divider margin="my-[20px]" />
    </motion.section>
  );
};
