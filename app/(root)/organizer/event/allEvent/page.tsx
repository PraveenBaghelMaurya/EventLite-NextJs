"use client";

import React, { useState, useEffect } from "react";
import { fetchOrganizerEvent } from "@/services/api/organizer";
import EventCard from "@/components/customUI/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Search, Loader2, Plus, CalendarX } from "lucide-react";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  image: string;
  price: number;
  venue: string;
  street: string;
  city: string;
  state: string;
  [key: string]: any;
}

export default function AllEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  const limit = 9; // Display 9 events per page

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, page]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetchOrganizerEvent({ page, limit, search });
      if (response?.success && response?.data) {
        setEvents(response.data.events || []);
        setTotalEvents(response.data.totalEvents || 0);
        setTotalPages(Math.ceil((response.data.totalEvents || 0) / limit));
      } else {
        // Handle edge case where data might be missing or structure is different
        setEvents([]);
        setTotalEvents(0);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50/30 p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Events
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your events and view their performance.
          </p>
        </div>
        <Link href="/organizer/event/create">
          <Button className="gap-2 shadow-sm transition-all hover:shadow-md">
            <Plus className="h-4 w-4" />
            Create New Event
          </Button>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by title, description..."
            className="focus-visible:ring-primary/20 border-gray-200 bg-white pl-10 shadow-sm transition-all duration-300"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="h-full">
                <EventCard item={event} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page - 1);
                      }}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      // Show first, last, current, and adjacent pages
                      return (
                        p === 1 || p === totalPages || Math.abs(p - page) <= 1
                      );
                    })
                    .map((p, index, array) => {
                      // Add ellipsis if gap > 1
                      const prev = array[index - 1];
                      const showEllipsis = prev && p - prev > 1;

                      return (
                        <React.Fragment key={p}>
                          {showEllipsis && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              isActive={page === p}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(p);
                              }}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      );
                    })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page + 1);
                      }}
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="mt-4 text-center text-xs text-gray-400">
            Showing {events.length} of {totalEvents} events
          </div>
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white p-8 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
            <CalendarX className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No events found
          </h3>
          <p className="mt-2 max-w-sm text-gray-500">
            {search
              ? `No events match "${search}". Try adjusting your search query.`
              : "You haven't created any events yet. Get started by creating your first event."}
          </p>
          {search ? (
            <Button variant="outline" onClick={clearSearch} className="mt-6">
              Clear Search
            </Button>
          ) : (
            <Link href="/organizer/event/create">
              <Button className="mt-6">Create Event</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
