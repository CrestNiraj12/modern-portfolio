import NepalFlag from "@/assets/nepal.gif";
import Niraj from "@/assets/niraj.png";
import { Navbar } from "@/components";
import { MoveDownRightIcon } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const Header = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });

  const backgroundY = useTransform(
    smoothScrollY,
    [0, 900],
    shouldReduceMotion ? [0, 0] : [0, 140],
  );
  const foregroundY = useTransform(
    smoothScrollY,
    [0, 900],
    shouldReduceMotion ? [0, 0] : [0, -220],
  );

  return (
    <div className="relative bg-primary grid grid-rows-[20px_1fr] items-center justify-items-center min-h-screen overflow-hidden p-12 pb-20 gap-16">
      <motion.div
        style={{ y: foregroundY }}
        className="absolute py-10 px-12 w-full top-0 left-1/2 z-0 -translate-x-1/2 will-change-transform"
      >
        <Navbar />
      </motion.div>
      <div className="row-start-2 max-h-[calc(100vh-20px)] overflow-hidden">
        <motion.div
          style={{ y: foregroundY }}
          className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center rounded-r-full bg-gray-400 p-4 will-change-transform"
        >
          <div className="flex-auto text-lg/6 w-40 pl-8">
            <p className="text-black">Located in the Himalayas</p>
          </div>
          <div className="flex-none bg-gray-500 place-items-center h-16 w-16 rounded-full p-4">
            <img
              src={NepalFlag.src}
              alt="Nepal flag"
              width={30}
              height={30}
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
            width={500}
            height={600}
            className="h-auto w-125 max-w-none object-contain"
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
        <div className="absolute bottom-10 left-0 right-0 overflow-hidden whitespace-nowrap">
          <motion.div className="will-change-transform">
            <div className="flex w-max animate-marquee">
              <span className="mx-4 shrink-0 text-[10rem] text-gray-200 leading-[1.1]">
                Niraj Shrestha &mdash; Niraj Shrestha &mdash;
              </span>
              <span
                aria-hidden="true"
                className="mx-4 shrink-0 text-[10rem] text-gray-200 leading-[1.1]"
              >
                Niraj Shrestha &mdash; Niraj Shrestha &mdash;
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { Header };
