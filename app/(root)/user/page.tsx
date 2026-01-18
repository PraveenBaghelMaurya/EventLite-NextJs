import React from "react";
import CarouselDemo from "@/components/customUI/caursel";
import CarouselSpacing from "@/components/customUI/multicaursel";
const Dashboardpage = () => {
  return (
    <>
      <div className="overflow-hidden font-extralight">
        <CarouselDemo />
        <div className="mx-4 mt-10 h-1/4 w-full font-sans">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Upcoming Events</h1>
            <h1 className="mx-12 cursor-pointer text-2xl hover:font-light">
              View All
            </h1>
          </div>
          <CarouselSpacing />
        </div>

        <div className="mx-4 mt-10 w-full font-sans">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Popular Events</h1>
            <h1 className="mx-12 cursor-pointer text-2xl hover:font-light">
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
