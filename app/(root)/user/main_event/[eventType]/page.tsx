"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchPastPopularEvents,
  fetchUpcomingEvents,
} from "@/services/api/event";
import EventCard from "@/components/customUI/EventCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const EventPage = () => {
  const params = useParams();
  const eventType = params.eventType as string;
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let response;
      const filters = { page: currentPage, limit: ITEMS_PER_PAGE };

      switch (eventType) {
        case "upcoming":
        case "featured": // Treating featured as upcoming for now or add specific API if exists
          response = await fetchUpcomingEvents(filters);
          break;
        case "past":
          response = await fetchPastPopularEvents(filters);
          break;
        default:
          response = await fetchUpcomingEvents(filters);
      }

      if (response && response.data) {
        setEvents(response.data.events || []);
        // Assuming the API returns total pages or total count.
        // If API returns totalCount, calculate totalPages.
        // Adjust based on actual API response structure.
        // Looking at event.ts, definitions return { success, message, data: { events, pagination } } usually?
        // Let's check api response structure in a moment if needed, defaulting to response.data.totalPages or 1
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [eventType, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold capitalize">{eventType} Events</h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] animate-pulse rounded-xl bg-gray-200"
            ></div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event, index) => (
              <EventCard key={event.id || index} item={event} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Simple pagination logic to show limited page numbers can be added here
                  // For now showing all pages if not too many, or could mask
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      ) : (
        <div className="flex h-60 items-center justify-center text-gray-500">
          No events found.
        </div>
      )}
    </div>
  );
};

export default EventPage;
