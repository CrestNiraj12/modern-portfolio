import { AnimatedButton, Divider } from "@/shared/components";
import type { Project } from "@/shared/types";

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full my-20">
        <div className="w-full">
          {projects.map((project) => (
            <div key={project.id}>
              <Divider className="w-full" />
              <p className="text-primary m-18 text-4xl">{project.name}</p>
            </div>
          ))}
        </div>
        <Divider className="w-full" />
      </div>
      <AnimatedButton
        text="More work"
        className="w-fit h-20 px-15 rounded-[100px]"
      />
    </div>
  );
};
