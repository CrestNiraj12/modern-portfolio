import { greetings } from "@/constants";
import { Body, Header } from "@/features/Home/components";
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
  const bodyRef = useRef<HTMLElement>(null);
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
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const getSections = () =>
      [
        curtainRef.current,
        bodyRef.current,
        projectsRef.current,
        spacerRef.current,
      ].filter((el): el is HTMLElement => el !== null);

    const targetY = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY;

    let currentIdx = 0;
    let isSnapping = false;

    const snapTo = (idx: number) => {
      const sections = getSections();
      const clamped = Math.max(0, Math.min(sections.length - 1, idx));
      if (clamped === currentIdx) return;
      isSnapping = true;
      currentIdx = clamped;
      lenis.scrollTo(targetY(sections[clamped]), {
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          isSnapping = false;
        },
      });
    };

    const onLenisScroll = ({ scroll }: { scroll: number }) => {
      if (isSnapping) return;
      const sections = getSections();

      if (currentIdx < sections.length - 1) {
        const current = sections[currentIdx];
        const next = sections[currentIdx + 1];
        const currentBottom = targetY(current) + current.offsetHeight;
        const nextTop = targetY(next);
        const trigger = Math.min(currentBottom, nextTop);
        if (scroll >= trigger) {
          snapTo(currentIdx + 1);
          return;
        }
      }
      if (currentIdx > 0) {
        const curTop = targetY(sections[currentIdx]);
        if (scroll < curTop) {
          snapTo(currentIdx - 1);
          return;
        }
      }
    };

    lenis.on("scroll", onLenisScroll);

    const onKey = (e: KeyboardEvent) => {
      const sections = getSections();
      const down = ["ArrowDown", "PageDown", " "].includes(e.key);
      const up = ["ArrowUp", "PageUp"].includes(e.key);
      const home = e.key === "Home";
      const end = e.key === "End";
      if (!(down || up || home || end)) return;
      e.preventDefault();
      if (isSnapping) return;
      if (down) snapTo(currentIdx + 1);
      else if (up) snapTo(currentIdx - 1);
      else if (home) snapTo(0);
      else if (end) snapTo(sections.length - 1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      lenis.off("scroll", onLenisScroll);
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
          <Body ref={bodyRef} projectsRef={projectsRef} projects={projects} />
          <motion.div
            ref={curveRef}
            style={{
              borderBottomLeftRadius: curtainRadius,
              borderBottomRightRadius: curtainRadius,
            }}
            className="w-full h-[200px] bg-background will-change-[border-radius]"
          />
        </div>
      )}

      {phase === "main" && (
        <div
          ref={spacerRef}
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
