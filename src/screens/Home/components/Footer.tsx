import Niraj from "@/assets/niraj.png";
import {
  AnimatedButton,
  Divider,
  Reveal,
  RevealText,
} from "@/shared/components";

export const Footer = () => {
  return (
    <section className="w-screen h-screen bg-primary flex flex-col justify-center items-start p-40">
      <div>
        <div className="flex items-center gap-6">
          <Reveal>
            <img
              src={Niraj.src}
              alt="Niraj Shrestha"
              className="size-18 xl:size-20 object-contain rounded-full bg-gray-400 shrink-0"
            />
          </Reveal>
          <RevealText
            text="Let's work"
            className="text-8xl"
            delay={0.1}
            stagger={0.07}
          />
        </div>
        <RevealText
          text="together"
          className="text-8xl"
          delay={0.3}
          stagger={0.07}
        />
      </div>
      <div className="relative w-full my-20">
        <Divider className="bg-gray-700" />
        <Reveal delay={0.2} className="absolute -bottom-25 right-20">
          <AnimatedButton
            text="Get in touch"
            overlayClassName="bg-black"
            className="bg-accent"
          />
        </Reveal>
      </div>
      <div className="flex gap-2">
        <Reveal delay={0.1}>
          <AnimatedButton variant="pill" text="crestniraj@gmail.com" />
        </Reveal>
        <Reveal delay={0.2}>
          <AnimatedButton
            variant="pill"
            text="+977 98 219 11389"
            className="px-10"
          />
        </Reveal>
      </div>
    </section>
  );
};
