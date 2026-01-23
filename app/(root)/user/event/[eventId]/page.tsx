"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/services/api/event";
import { EventById, singleEvent } from "@/services/interface/event";

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const [eventData, setEventData] = useState<singleEvent | null>(null);

  const eventMock = {
    title: "Tech Conference 2026",
    image: "/event.jpg",
    date: "20 Feb 2026",
    location: "Delhi, India",
    price: 499,
    availableTickets: 50,
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventId = (await params).eventId;
        const event = await getEventById(Number(eventId));
        console.log("event Data", event);
        setEventData(event.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
  }, [params]);

  const [tickets, setTickets] = useState(1);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* LEFT SIDE – EVENT IMAGE */}
        <div className="relative h-[350px] w-full overflow-hidden rounded-xl border-2">
          {eventData?.image ? (
            <img
              src={eventData?.image}
              alt={eventData?.title || "Event Image"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* RIGHT SIDE – EVENT DETAILS */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold">{eventData?.title}</h1>

          {/* Meta Data */}
          <div className="text-muted-foreground space-y-2 text-sm">
            <p>📅 {eventData?.startDate?.split("T")[0]}</p>
            <p>
              📍 {eventData?.venue}, {eventData?.city}, {eventData?.state}
            </p>
            <p>💰 ₹{eventData?.price}</p>
            <p>🎟️ Available Tickets: {eventData?.availableTickets}</p>
          </div>

          {/* Ticket Counter */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="font-medium">Number of Tickets</span>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTickets((t) => Math.max(1, t - 1))}
              >
                −
              </Button>

              <span className="w-6 text-center font-semibold">{tickets}</span>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setTickets((t) =>
                    Math.min(eventData?.availableTickets || 0, t + 1)
                  )
                }
              >
                +
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="text-lg font-semibold">
            Total: ₹{tickets * (eventData?.price || 0)}
          </div>

          {/* Book Button */}
          <Button size="lg" className="w-full">
            Book Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
