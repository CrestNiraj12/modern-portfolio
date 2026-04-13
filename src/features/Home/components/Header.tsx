import NepalFlag from "@/assets/nepal.gif";
import Niraj from "@/assets/niraj.png";
import { Navbar } from "@/shared/components";
import { useScrollAnimation } from "@/shared/hooks/animation";
import { MoveDownRightIcon } from "lucide-react";
import {
  motion,
  MotionValue,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef } from "react";

interface HeaderProps {
  velocity: MotionValue<number>;
}

const Header = ({ velocity }: HeaderProps) => {
  const { scrollY, foregroundY, backgroundY } = useScrollAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirectionRef = useRef(1);
  const lastScrollY = useRef(1);

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
    <motion.section
      style={{ y: foregroundY }}
      className="relative bg-primary grid grid-rows-[20px_1fr] items-center justify-items-center min-h-[105vh] overflow-hidden p-12 pb-20 gap-16"
    >
      <motion.div
        style={{ y: foregroundY }}
        className="absolute py-10 px-12 w-full top-0 left-1/2 z-0 -translate-x-1/2 will-change-transform"
      >
        <Navbar />
      </motion.div>
      <div className="row-start-2 overflow-hidden">
        <motion.div
          style={{ y: foregroundY }}
          className="absolute left-0 top-1/2 z-10 flex -translate-y-[15vh] items-center rounded-r-full bg-gray-400 w-[16vw] min-w-70 h-[12vh] p-4 will-change-transform"
        >
          <div className="flex-auto text-lg/6  pl-8">
            <p className="text-black">Located in the Himalayas</p>
          </div>
          <div className="flex-none bg-gray-500 place-items-center h-[4vw] w-[4vw] rounded-full p-4">
            <img
              src={NepalFlag.src}
              alt="Nepal flag"
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ y: backgroundY }}
          className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2 will-change-transform"
        >
          <img
            src={Niraj.src}
            alt="Niraj Shrestha"
            className="h-auto w-[38vw] max-h-[105vh] max-w-none object-contain"
          />
        </motion.div>
        <motion.div
          style={{ y: foregroundY }}
          className="absolute right-30 top-[45vh] z-10 -translate-y-1/2 will-change-transform"
        >
          <div>
            <MoveDownRightIcon strokeWidth={1} size={32} />
          </div>
          <p className="mt-10 text-3xl/12 w-75 text-gray-200">
            Software Engineer
            <br />& Fullstack developer
          </p>
        </motion.div>
        <div className="absolute bottom-25 left-0 right-0 overflow-hidden whitespace-nowrap">
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
                  className="mx-4 shrink-0 text-[10rem] text-gray-200 leading-[1.1]"
                >
                  Niraj Shrestha &mdash; Niraj Shrestha &mdash;
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export { Header };
