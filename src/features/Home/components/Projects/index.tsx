import {
  AnimatedButton,
  Divider,
  Reveal,
  RevealText,
} from "@/shared/components";
import type { Project } from "@/shared/types";
import { useState } from "react";
import { ProjectCursor } from "./ProjectCursor";

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  const [hovered, setHovered] = useState<Project | null>(null);

  return (
    <div className="flex flex-col gap-15 justify-center items-start">
      <ProjectCursor project={hovered} />
      <RevealText
        text="Recent Work"
        className="text-sm text-gray-500 uppercase px-6 sm:px-10 lg:px-20"
      />
      <div
        onMouseLeave={() => setHovered(null)}
        className="w-full flex flex-col items-center"
      >
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              if (
                typeof window === "undefined" ||
                !window.matchMedia("(pointer: fine)").matches
              )
                return;
              setHovered(project);
            }}
            className="block w-full lg:cursor-none"
          >
            <Divider />
            <div className="lg:hidden px-6 sm:px-10 pt-6">
              <img
                src={project.openGraphImageUrl}
                alt={project.name}
                className="w-full aspect-video object-cover bg-gray-200 rounded-lg"
              />
            </div>
            <div className="px-6 sm:px-10 lg:px-20 py-6 lg:py-12">
              <RevealText
                text={project.name}
                className="text-primary text-2xl sm:text-3xl lg:text-4xl"
              />
            </div>
          </a>
        ))}
        <Divider className="w-full" />
      </div>
      <div className="w-full flex flex-col items-center">
        <Reveal delay={0.1} className="mt-8 lg:mt-15">
          <a
            href="https://github.com/CrestNiraj12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedButton
              text="More work"
              className="w-fit h-20 px-15 rounded-[100px]"
            />
          </a>
        </Reveal>
      </div>
    </div>
  );
};
