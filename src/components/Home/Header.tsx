import NepalFlag from "@/assets/nepal.gif";
import Niraj from "@/assets/niraj.png";
import { Navbar } from "@/components";
import { MoveDownRightIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="relative bg-primary grid grid-rows-[20px_1fr] items-center justify-items-center min-h-screen p-12 pb-20 gap-16">
      <Navbar />
      <div className="row-start-2 max-h-[calc(100vh-20px)] overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center bg-gray-400 p-4 rounded-r-full">
          <div className="flex-auto text-lg/6 w-40 pl-8">
            <p className="text-black">Located in the Himalayas</p>
          </div>
          <div className="flex-none bg-gray-500 place-items-center h-16 w-16 rounded-full p-4">
            <img
              src={NepalFlag.src}
              alt="Nepal flag"
              width={30}
              height={30}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <img
            src={Niraj.src}
            alt="Niraj Shrestha"
            width={500}
            height={600}
            className="h-auto w-125 max-w-none object-contain"
          />
        </div>
        <div className="absolute right-30 top-[45vh] -translate-y-1/2 z-10">
          <div>
            <MoveDownRightIcon strokeWidth={1} size={32} />
          </div>
          <p className="mt-10 text-3xl/12 w-75 text-white">
            Software Engineer
            <br />& Fullstack developer
          </p>
        </div>
        <div className="absolute bottom-10 left-0 right-0 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            <span className="mx-4 text-[10rem] text-white leading-[1.1]">
              Niraj Shrestha &mdash; Niraj Shrestha &mdash;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Header };
