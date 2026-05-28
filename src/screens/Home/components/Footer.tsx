import Niraj from "@/assets/niraj.png";
import {
  AnimatedButton,
  Divider,
  GitHubLink,
  LinkedInLink,
  Reveal,
  RevealText,
} from "@/shared/components";
import { useMagneticAnimation } from "@/shared/hooks/animation";
import { motion } from "motion/react";

const GetInTouchCircle = () => {
  const { ref, springX, springY, textX, textY, handleMouseMove, reset } =
    useMagneticAnimation();

  return (
    <motion.div
      initial={{ x: "-50vw", opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15,
      }}
      className="absolute -bottom-15 right-4 lg:-bottom-25 lg:right-20"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{ x: springX, y: springY }}
        className="will-change-transform"
      >
        <a
          href="mailto:crestniraj@gmail.com"
          className="flex items-center justify-center rounded-full bg-accent size-30 lg:size-50"
        >
          <motion.span
            style={{ x: textX, y: textY }}
            className="text-white text-sm lg:text-base"
          >
            Get in touch
          </motion.span>
        </a>
      </motion.div>
    </motion.div>
  );
};

export const Footer = () => {
  return (
    <section className="w-screen h-screen bg-primary flex flex-col justify-center items-start p-6 sm:p-10 lg:p-40">
      <div>
        <div className="flex items-center gap-4 lg:gap-6">
          <Reveal>
            <img
              src={Niraj.src}
              alt="Niraj Shrestha"
              className="size-12 sm:size-16 xl:size-20 object-contain rounded-full bg-gray-400 shrink-0"
            />
          </Reveal>
          <RevealText
            text="Let's work"
            className="text-5xl sm:text-6xl lg:text-8xl"
            delay={0.1}
            stagger={0.07}
          />
        </div>
        <RevealText
          text="together"
          className="text-5xl sm:text-6xl lg:text-8xl"
          delay={0.3}
          stagger={0.07}
        />
      </div>
      <div className="relative w-full my-12 lg:my-20">
        <Divider className="bg-gray-700" />
        <GetInTouchCircle />
      </div>
      <div className="w-full flex flex-col gap-8 lg:gap-6 mt-20 lg:mt-0">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:flex-wrap w-full">
          <Reveal delay={0.1} className="w-full sm:w-auto">
            <a href="mailto:crestniraj@gmail.com" className="block w-full">
              <AnimatedButton
                variant="pill"
                text="crestniraj@gmail.com"
                className="w-full sm:w-auto justify-center"
              />
            </a>
          </Reveal>
          <Reveal delay={0.2} className="w-full sm:w-auto">
            <a
              href="https://wa.me/9779821911389"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <AnimatedButton
                variant="pill"
                text="+977 98 219 11389"
                className="w-full sm:w-auto sm:px-10 justify-center"
              />
            </a>
          </Reveal>
        </div>
        <div className="flex gap-3">
          <Reveal delay={0.3}>
            <GitHubLink
              className="border-gray-700 hover:border-white"
              iconClassName="text-white"
            />
          </Reveal>
          <Reveal delay={0.4}>
            <LinkedInLink
              className="border-gray-700 hover:border-[#0A66C2]"
              iconClassName="text-[#0A66C2]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
