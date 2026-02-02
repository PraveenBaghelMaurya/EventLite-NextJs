"use client";
import { useState } from "react";
import CarouselDemo from "@/components/customUI/caursel";
import CarouselSpacing from "@/components/customUI/multicaursel";
import CircularCarousel from "@/components/customUI/circularcarousel";
import Footer from "@/components/Footer/Footer";
import { useAppDispatch } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { getUpcomingEvents } from "@/services/api/event";
import { singleEvent } from "@/services/interface/event";
import { getPastPopularEvents } from "@/services/api/event";
import { getOrganizers } from "@/services/api/organizer";
import { getOrganizerResponse } from "@/services/interface/event";

const UserDashboardpage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<singleEvent[]>([]);
  const [pastPopularEvents, setPastPopularEvents] = useState<singleEvent[]>([]);
  const [organizers, setOrganizers] = useState<getOrganizerResponse[]>([]);
  const disptach = useAppDispatch();

  useEffect(() => {
    disptach(getUpcomingEvents({ page: 1, limit: 10 }))
      .unwrap()
      .then((res: any) => {
        console.log("upcomingEvents", res);
        setUpcomingEvents(res.data.events);
      });
    disptach(getPastPopularEvents({ page: 1, limit: 10 }))
      .unwrap()
      .then((res: any) => {
        console.log("pastPopularEvents", res);
        setPastPopularEvents(res.data.events);
      });
    disptach(getOrganizers({ page: 1, limit: 10 }))
      .unwrap()
      .then((res: any) => {
        console.log("organizers", res);
        setOrganizers(res.data);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50">
      {/* Hero Section */}
      <div className="w-full">
        <CarouselDemo />
      </div>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        {/* Featured Events */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Featured Events
            </h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <CarouselSpacing />
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Upcoming Events
            </h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <CarouselSpacing event={upcomingEvents} />
        </section>

        {/* Past Popular Events */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Past Popular Events
            </h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <CarouselSpacing event={pastPopularEvents} />
        </section>

        {/* Our Best Organizers */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Our Best Organizers
            </h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <CircularCarousel organizers={organizers} />
        </section>
      </main>

      {/* Footer */}
      <Footer organizers={organizers} />
    </div>
  );
};

export default UserDashboardpage;
