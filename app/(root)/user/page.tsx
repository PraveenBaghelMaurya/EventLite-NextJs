import CarouselDemo from "@/components/customUI/caursel";
import CarouselSpacing from "@/components/customUI/multicaursel";
import CircularCarousel from "@/components/customUI/circularcarousel";
import Footer from "@/components/Footer/Footer";

import { fetchUpcomingEvents, fetchPastPopularEvents } from "@/services/api/event";
import { fetchOrganizers } from "@/services/api/organizer";
import Link from "next/link";
import { redirect } from "next/navigation";

const UserDashboardpage = async () => {

  // ✅ SERVER-SIDE fetching
  const [upcomingRes, pastPopularRes, organizersRes] = await Promise.all([
    fetchUpcomingEvents({ page: 1, limit: 10 }),
    fetchPastPopularEvents({ page: 1, limit: 10 }),
    fetchOrganizers({ page: 1, limit: 10 }),
  ]);

  const upcomingEvents = upcomingRes.data.events;
  const pastPopularEvents = pastPopularRes.data.events;
  const organizers = organizersRes.data.organizers;



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
            <h2 className="text-2xl font-bold md:text-3xl">
              Featured Events
            </h2>
            <Link href="/user/main_event/featured" className="text-primary text-sm font-medium">
              View All
            </Link>
          </div>
          <CarouselSpacing />
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">
              Upcoming Events
            </h2>
            <Link href="/user/main_event/upcoming" className="text-primary text-sm font-medium">
              View All
            </Link>
          </div>
          <CarouselSpacing event={upcomingEvents} />
        </section>

        {/* Past Popular Events */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">
              Past Popular Events
            </h2>
            <Link href="/user/main_event/past" className="text-primary text-sm font-medium">
              View All
            </Link>
            
          </div>
          <CarouselSpacing event={pastPopularEvents} />
        </section>

        {/* Organizers */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">
              Our Best Organizers
            </h2>
            <button className="text-primary text-sm font-medium">
              View All
            </button>
          </div>
          <CircularCarousel organizers={organizers} />
        </section>
      </main>

      <Footer organizers={organizers} />
    </div>
  );
};

export default UserDashboardpage;
