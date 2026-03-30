import { Divider } from "@/components";

export const Body = () => {
  return (
    <div className="flex flex-col px-40 py-40 bg-gray-100 text-black">
      <div className="px-20">
        <div className="flex justify-between">
          <h2 className="text-3xl/12 w-150">
            I transform complex ideas into powerful, user-focused products that
            give your business a real edge.
          </h2>
          <h6 className="text-md w-60">
            I thrive on solving problems through code, turning challenges into
            systems that actually make sense.
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
