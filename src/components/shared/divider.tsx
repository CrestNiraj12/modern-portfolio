type DividerProps = {
  height?: number;
  margin?: string;
};

export const Divider = ({ height = 1, margin = "my-8" }: DividerProps) => {
  return <div className={`${margin} w-full h-[${height}px] bg-gray-300`} />;
};
