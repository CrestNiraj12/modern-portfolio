import { AnimatedButton, Divider } from "@/shared/components";
import type { Project } from "@/shared/types";

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  return (
    <div className="flex flex-col gap-15 justify-center items-start mt-10 md:mb-25 lg:mt-20">
      <h6 className="text-sm text-gray-500 uppercase px-20">Recent Work</h6>
      <div className="w-full flex flex-col justify-center items-center gap-20">
        {projects.map((project) => (
          <div className="w-full flex flex-col gap-20" key={project.id}>
            <Divider />
            <p className="text-primary text-4xl px-20">{project.name}</p>
          </div>
        ))}
        <Divider className="w-full" />
        <AnimatedButton
          text="More work"
          className="w-fit h-20 px-15 rounded-[100px]"
        />
      </div>
    </div>
  );
};
