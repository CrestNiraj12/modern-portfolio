import { cn } from "../utils/cn";

type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={cn("w-full bg-gray-300 h-px", className ? className : "")}
    />
  );
};
