import { Divider } from "@/components";

export const Body = () => {
  return (
    <div className="flex flex-col px-40 py-40 bg-white text-black">
      <div className="px-20">
        <div className="flex justify-between">
          <h2 className="text-3xl/12 w-150">
            I will help you reach out the best potential of your business by
            providing users with best user experience and design.
          </h2>
          <h6 className="text-md w-60">
            The combination of my passion for design, code & passion positions
            me in a unique place in the software world.
          </h6>
        </div>
        <div className="flex w-full justify-between items-end">
          <h6 className="text-sm text-gray-500 uppercase">Recent Work</h6>
          <div className="flex justify-center items-center rounded-full bg-black w-50 h-50">
            <p className="text-white">About Me</p>
          </div>
        </div>
      </div>
      <Divider margin="my-[20px]" />
    </div>
  );
};
