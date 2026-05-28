import { greetings } from "@/constants";
import { About, Header, Projects } from "@/features/Home/components";
import { Footer } from "@/screens/Home/components/Footer";
import { RevealText } from "@/shared/components";
import type { Project, TransitionPhase } from "@/shared/types";
import Lenis from "lenis";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

interface HomeProps {
  projects: Project[];
}

export default function Home({ projects }: HomeProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<TransitionPhase>("intro");
  const velocity = useMotionValue(0);
  const curtainRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const curtainRadius = useTransform(scrollY, () => {
    const curve = curveRef.current;
    if (typeof window === "undefined" || !curve) return "100%";
    const rect = curve.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
    return `${(1 - progress) * 100}%`;
  });

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

  useEffect(() => {
    if (phase !== "main") return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    let isEasingToTop = false;

    const easeToTop = () => {
      if (isEasingToTop) return;
      isEasingToTop = true;
      lenis.scrollTo(0, {
        duration: 2.2,
        easing: (t) => 1 - Math.pow(1 - t, 5),
        lock: true,
        onComplete: () => {
          isEasingToTop = false;
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY >= 0) return;
      if (isEasingToTop) return;
      if (window.scrollY <= 0) return;
      if (window.scrollY > 400) return;
      e.preventDefault();
      e.stopPropagation();
      easeToTop();
    };
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });

    const idToRef: Record<string, HTMLElement | null | undefined> = {
      work: projectsRef.current,
      about: aboutRef.current,
      contact: spacerRef.current,
    };

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const el = idToRef[href.slice(1)];
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [phase]);

  return (
    <div className="relative w-screen bg-primary">
      {phase === "main" && (
        <div className="fixed inset-x-0 bottom-0 h-screen z-0">
          <Footer />
        </div>
      )}

      {phase !== "intro" && (
        <div
          ref={curtainRef}
          className="relative z-20 will-change-transform"
        >
          <Header velocity={velocity} />
          <About ref={aboutRef} />
          <div
            ref={projectsRef}
            id="work"
            className="bg-background pt-10 lg:pt-20 pb-4 lg:pb-20"
          >
            <Projects projects={projects} />
          </div>
          <motion.div
            ref={curveRef}
            style={{
              borderBottomLeftRadius: curtainRadius,
              borderBottomRightRadius: curtainRadius,
            }}
            className="w-full h-[35vw] lg:h-[200px] bg-background will-change-[border-radius]"
          />
        </div>
      )}

      {phase === "main" && (
        <div
          ref={spacerRef}
          id="contact"
          aria-hidden
          className="relative z-0 h-screen w-full pointer-events-none"
        />
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
          <h1 className="text-4xl font-bold text-white">
            {index === 0 ? (
              <RevealText
                text={greetings[0]}
                duration={0.5}
                stagger={0.03}
              />
            ) : (
              greetings[Math.min(index, greetings.length - 1)]
            )}
          </h1>
        </motion.div>
      )}
    </div>
  );
}
