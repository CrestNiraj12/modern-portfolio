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
    <div className="flex flex-col gap-15 justify-center items-start mt-10 lg:mt-20">
      <ProjectCursor project={hovered} />
      <RevealText
        text="Recent Work"
        className="text-sm text-gray-500 uppercase px-20"
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
            onMouseEnter={() => setHovered(project)}
            className="block w-full cursor-none"
          >
            <Divider />
            <div className="px-20 py-12">
              <RevealText
                text={project.name}
                className="text-primary text-4xl"
              />
            </div>
          </a>
        ))}
        <Divider className="w-full" />
        <Reveal delay={0.1} className="mt-15">
          <AnimatedButton
            text="More work"
            className="w-fit h-20 px-15 rounded-[100px]"
          />
        </Reveal>
      </div>
    </div>
  );
};
