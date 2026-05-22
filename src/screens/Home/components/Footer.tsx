import Niraj from "@/assets/niraj.png";
import { AnimatedButton, Divider } from "@/shared/components";
import { useScrollAnimation } from "@/shared/hooks/animation";
import { motion } from "motion/react";

export const Footer = () => {
  const { foregroundY } = useScrollAnimation();

  return (
    <motion.section
      style={{ y: foregroundY }}
      className="w-screen h-screen bg-primary flex flex-col justify-center items-start p-40 will-change-transform snap-y snap-mandatory"
    >
      <div className="relative wrap-break-word whitespace-normal max-w-xl">
        <div className="inline-block size-18 xl:size-20 top-2">
          <img
            src={Niraj.src}
            alt="Niraj Shrestha"
            className="h-full w-full max-w-none object-contain rounded-full bg-gray-400"
          />
        </div>
        <span className="text-8xl"> Let's work together</span>
      </div>
      <div className="relative w-full my-20">
        <Divider className="bg-gray-700" />
        <AnimatedButton
          text="Get in touch"
          overlayClassName="bg-black"
          className="absolute -bottom-25 right-20 bg-accent"
        />
      </div>
      <div className="flex gap-2">
        <AnimatedButton variant="pill" text="crestniraj@gmail.com" />
        <AnimatedButton
          variant="pill"
          text="+977 98 219 11389"
          className="px-10"
        />
      </div>
    </motion.section>
  );
};
