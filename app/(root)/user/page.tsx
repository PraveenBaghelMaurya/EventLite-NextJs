import React from "react";
import CarouselDemo from "@/components/customUI/caursel";
import CarouselSpacing from "@/components/customUI/multicaursel";
const Dashboardpage = () => {
  return (
    <>
      <div className="overflow-hidden font-extralight">
        <CarouselDemo />
        <div className="mt-10 mx-4 h-1/4 w-full font-sans">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Upcoming Events</h1>
            <h1 className="text-2xl hover:font-light cursor-pointer mx-12">
              View All
            </h1>
          </div>
          <CarouselSpacing />
        </div>

        <div className="mt-10 mx-4 w-full font-sans">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Popular Events</h1>
            <h1 className="text-2xl hover:font-light cursor-pointer mx-12">
              View All
            </h1>
          </div>
          <CarouselSpacing />
        </div>
      </div>
    </>
  );
};

export default Dashboardpage;
