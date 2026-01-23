import React from "react";
import CarouselDemo from "@/components/customUI/caursel";
import CarouselSpacing from "@/components/customUI/multicaursel";
import CircularCarousel from "@/components/customUI/circularcaursel";
import Footer from "@/components/Footer/Footer";
const UserDashboardpage = () => {
  return (
    <>
      {/* stories */}
      <div className="overflow-hidden font-extralight">
        <CarouselDemo />
        <div className="mx-4 mt-10 h-1/4 w-full font-sans">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Featured Events</h1>
            <h1 className="mx-12 cursor-pointer text-2xl hover:font-light">
              View All
            </h1>
          </div>
          <CarouselSpacing />
        </div>

        {/* feature events */}
        <div className="mx-4 mt-10 w-full font-sans">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Upcoming Events</h1>
            <h1 className="mx-12 cursor-pointer text-2xl hover:font-light">
              View All
            </h1>
          </div>
          <CarouselSpacing />
        </div>
      </div>

      {/* popular events */}
      <div className="mx-4 mt-10 w-full font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Past Popular Events</h1>
          <h1 className="mx-12 cursor-pointer text-2xl hover:font-light">
            View All
          </h1>
        </div>
        <CarouselSpacing />
      </div>

      {/* past popular events */}
      <div className="mx-4 mt-10 w-full font-sans">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Past Popular Events</h1>
          <h1 className="mx-12 cursor-pointer text-2xl hover:font-light">
            View All
          </h1>
        </div>
        <CircularCarousel />
      </div>

      {/* footer */}
      <div className="mx-4 mt-10 w-full font-sans">
        <div className="mx-4 mt-10 w-full font-sans">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UserDashboardpage;
