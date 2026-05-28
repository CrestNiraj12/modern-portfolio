import NepalFlag from "@/assets/nepal.gif";
import Niraj from "@/assets/niraj.png";
import { Navbar, RevealText } from "@/shared/components";
import { useScrollAnimation } from "@/shared/hooks/animation";
import { MoveDownRightIcon } from "lucide-react";
import {
  motion,
  MotionValue,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const getKtmTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

interface HeaderProps {
  velocity: MotionValue<number>;
}

const Header = ({ velocity }: HeaderProps) => {
  const { scrollY, foregroundY, backgroundY } = useScrollAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirectionRef = useRef(1);
  const lastScrollY = useRef(1);
  const [time, setTime] = useState(getKtmTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(getKtmTime()), 30 * 1000);
    return () => window.clearInterval(id);
  }, []);

  const smoothVelocity = useSpring(velocity, {
    stiffness: 200,
    damping: 40,
    mass: 2,
  });

  useAnimationFrame(() => {
    const y = scrollY.get();
    const lastY = lastScrollY.current;
    const delta = y - lastY;

    if (delta > 0) {
      scrollDirectionRef.current = -1;
    } else if (delta < 0) {
      scrollDirectionRef.current = 1;
    }

    lastScrollY.current = y;

    const isAtTop = y < 50;
    const targetVelocity = isAtTop
      ? 1
      : scrollDirectionRef.current + delta * 0.3 * -1;
    velocity.set(targetVelocity);

    let next = x.get() + smoothVelocity.get();
    const width = (containerRef.current?.scrollWidth ?? 0) / 2;
    if (next >= 0) {
      next = -width;
    } else if (next <= -width) {
      next = 0;
    }

    x.set(next);
  });

  return (
    <section className="relative bg-primary grid grid-rows-[20px_1fr] items-center justify-items-center min-h-[105vh] overflow-hidden p-6 lg:p-12 lg:pb-20 gap-16">
      <motion.div
        style={{ y: foregroundY }}
        className="absolute py-6 px-6 lg:py-10 lg:px-12 w-full top-0 left-1/2 z-20 -translate-x-1/2 will-change-transform"
      >
        <Navbar />
      </motion.div>

      <div className="row-start-2 overflow-hidden">
        {/* Located in Himalayas — desktop only */}
        <motion.div
          style={{ y: foregroundY }}
          className="hidden lg:flex absolute left-0 top-1/2 z-10 -translate-y-[15vh] items-center rounded-r-full bg-gray-400 w-[16vh] min-w-70 h-25 p-4 will-change-transform"
        >
          <div className="flex-auto pl-8 text-black leading-tight">
            <p className="text-xl font-medium tabular-nums">{time}</p>
            <p className="text-sm text-gray-700">Kathmandu, NPT</p>
          </div>
          <div className="flex-none bg-gray-500 place-items-center h-20 w-20 rounded-full p-4">
            <img
              src={NepalFlag.src}
              alt="Nepal flag"
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>

        {/* Photo background */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute z-0 will-change-transform inset-x-0 bottom-0 h-[90%] lg:inset-x-auto lg:h-auto lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-full will-change-transform"
          >
            <img
              src={Niraj.src}
              alt="Niraj Shrestha"
              className="h-full w-full object-cover object-bottom lg:h-auto lg:w-screen lg:max-h-[105vh] lg:max-w-none lg:object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Software Engineer text — desktop right; mobile bottom-left */}
        <motion.div
          style={{ y: foregroundY }}
          className="absolute z-10 will-change-transform left-6 bottom-40 lg:left-auto lg:bottom-auto lg:right-30 lg:top-[45vh] lg:-translate-y-1/2"
        >
          <div>
            <MoveDownRightIcon strokeWidth={1} className="size-10 lg:size-8" />
          </div>
          <RevealText
            text={"Software Engineer\n& Fullstack developer"}
            className="mt-4 lg:mt-10 text-3xl/9 lg:text-3xl/12 w-65 lg:w-75 text-gray-200"
            delay={0.15}
          />
        </motion.div>

        {/* Mobile-only: flag + time + Nepali greeting, bottom-right */}
        <motion.div
          style={{ y: foregroundY }}
          className="lg:hidden absolute right-6 bottom-40 z-10 flex flex-col items-end gap-2 will-change-transform"
        >
          <img
            src={NepalFlag.src}
            alt="Nepal flag"
            className="size-12 object-contain"
          />
          <p className="text-sm text-gray-200 tabular-nums">{time} NPT</p>
        </motion.div>

        {/* Marquee — centered vertically and bigger on mobile */}
        <div className="absolute top-1/2 -translate-y-1/2 lg:translate-y-0 lg:top-auto lg:bottom-25 left-0 right-0 overflow-hidden whitespace-nowrap z-10">
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="will-change-transform"
          >
            <div className="flex w-max">
              {[0, 1].map((_, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className="mx-4 shrink-0 text-[9rem] sm:text-[11rem] lg:text-[10rem] text-gray-200 leading-[1.1]"
                >
                  Niraj Shrestha · Niraj Shrestha ·
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Header };
