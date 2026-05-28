import { AnimatedButton, Reveal, RevealText } from "@/shared/components";
import type { Project } from "@/shared/types";
import { forwardRef, type Ref } from "react";
import { Projects } from "./Projects";

interface BodyProps {
  projects: Project[];
  projectsRef?: Ref<HTMLDivElement>;
}

export const Body = forwardRef<HTMLElement, BodyProps>(
  ({ projects, projectsRef }, ref) => {
    return (
      <section
        ref={ref}
        className="relative flex flex-col pt-40 xl:px-40 text-black bg-background"
      >
        <div className="px-20">
          <div className="flex justify-between gap-6">
            <RevealText
              className="text-3xl/12 max-w-150"
              text="I transform complex ideas into powerful, user-focused products that give your business a real edge."
            />
            <div className="flex flex-col gap-10">
              <RevealText
                className="text-lg max-w-60"
                text="I thrive on solving problems through code, turning challenges into systems that actually make sense."
                delay={0.1}
              />
              <Reveal delay={0.3}>
                <AnimatedButton text="About me" />
              </Reveal>
            </div>
          </div>
        </div>
        <div ref={projectsRef}>
          <Projects projects={projects} />
        </div>
      </section>
    );
  },
);

Body.displayName = "Body";
