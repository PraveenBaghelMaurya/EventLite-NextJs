"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getEventByCategoryName } from "@/services/api/event";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

// const categories = [
//   {
//     id: 1,
//     title: "Tech Conference",
//     image: "/placeholder-event.jpg",
//     price: 0,
//     description: "A conference about modern web technologies.",
//     startDate: "2026-02-10",
//     endDate: "2026-02-12",
//     venue: "Expo Center",
//     city: "Delhi",
//     state: "India",
//   },
// ];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const CategoriesPage = () => {
  const params = useParams<{ categories: string }>();
  const slug = params.categories;
  const [events, setEvents] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await getEventByCategoryName(slug, currentPage, 10);
        setEvents(eventsResponse.data.events);
        setTotalPages(eventsResponse.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [slug, currentPage]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold capitalize">{slug} Events</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((item: any, index: number) => (
          <div
            key={index}
            className="group relative h-full overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Link href={`/user/event/${item.id}`} key={item.id}>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                // fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-2 right-2">
                <Badge variant="secondary">
                  {item.price > 0 ? `₹${item.price}` : "Free"}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-3">
              <h3 className="line-clamp-1 text-base font-semibold">
                {item.title}
              </h3>

              <p className="line-clamp-2 text-xs text-gray-500">
                {item.description}
              </p>

              <div className="mt-2 space-y-1 border-t pt-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary h-3.5 w-3.5" />
                  {formatDate(item.startDate)}
                  {item.endDate && ` - ${formatDate(item.endDate)}`}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="text-primary h-3.5 w-3.5" />
                  {[item.venue, item.city, item.state]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              </div>
            </div>
            </Link>
          </div>
          
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )} 
    </div>
  );
};

export default CategoriesPage;
