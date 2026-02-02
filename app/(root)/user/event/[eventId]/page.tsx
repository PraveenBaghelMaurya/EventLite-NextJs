"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getEventById } from "@/services/api/event";
import { singleEvent } from "@/services/interface/event";
import {
  Calendar,
  MapPin,
  User,
  Ticket,
  Clock,
  Share2,
  Heart,
  Globe,
  Mail,
  Info,
} from "lucide-react";

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const [eventData, setEventData] = useState<singleEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventId = (await params).eventId;
        const event = await getEventById(eventId);
        setEventData(event.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [params]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-200"></div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <p className="mt-2 text-gray-500">
          The event you are looking for does not exist or has been removed.
        </p>
        <Button className="mt-6" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Section / Banner */}
      <div className="relative h-[300px] w-full bg-gray-900 md:h-[400px]">
        <img
          src={eventData.image || "/placeholder-event.jpg"}
          alt={eventData.title}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute bottom-0 left-1/2 container mx-auto -translate-x-1/2 p-6 md:p-10">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 mb-4">
            {eventData.category?.name || "Event"}
          </Badge>
          <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            {eventData.title}
          </h1>
          <p className="flex items-center gap-2 text-gray-200 md:text-lg">
            <Calendar className="h-5 w-5" />
            {formatDate(eventData.startDate)} •{" "}
            {formatTime(eventData.startDate)}
          </p>
        </div>
      </div>

      <div className="container mx-auto -mt-10 grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-6">
        {/* LEFT COLUMN: Main Content */}
        <div className="space-y-8 md:col-span-2">
          {/* About Event */}
          <Card className="border-none shadow-md">
            <CardContent className="p-6 md:p-10">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="organizer">Organizer</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-xl font-bold">About This Event</h3>
                    <div
                      className="prose prose-gray max-w-none leading-relaxed text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html:
                          eventData.description || eventData.shortDescription,
                      }}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-3 text-xl font-bold">Overview</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                        <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                          <Ticket className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Ticket Price</p>
                          <p className="text-sm text-gray-500">
                            {eventData.price > 0
                              ? `Starting from ₹${eventData.price}`
                              : "Free Entry"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-sm text-gray-500">
                            {eventData.endDate
                              ? `${formatTime(eventData.startDate)} - ${formatTime(eventData.endDate)}`
                              : "All Day"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="organizer">
                  <div className="flex items-center gap-4 rounded-lg border p-6">
                    <div className="text-primary flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold">
                      {eventData.organizer?.name?.charAt(0) || "O"}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        {eventData.organizer?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {eventData.organizer?.email}
                      </p>
                      <Button
                        variant="link"
                        className="text-primary mt-1 h-auto px-0"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Location Map Placeholder */}
          <Card className="border-none shadow-md">
            <CardContent className="p-6 md:p-8">
              <h3 className="mb-4 text-xl font-bold">Event Location</h3>
              <div className="mb-6 flex items-start gap-3 text-gray-600">
                <MapPin className="text-primary h-5 w-5 shrink-0" />
                <p>
                  {eventData.venue}, {eventData.street}, {eventData.city},{" "}
                  {eventData.state}, {eventData.country} {eventData.postalCode}
                </p>
              </div>

              <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gray-200">
                {/* This would be an integration with Google Maps or similar */}
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-10 w-10 opacity-50" />
                    <p>Full Map View</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Booking Card */}
        <div className="relative md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="border-none shadow-lg ring-1 ring-black/5">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="text-primary text-3xl font-bold">
                      {eventData.price > 0
                        ? `₹${eventData.price * tickets}`
                        : "Free"}
                    </p>
                  </div>
                  <div className="text-right">
                    {eventData.availableTickets > 0 ? (
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700"
                      >
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Sold Out</Badge>
                    )}
                  </div>
                </div>

                {eventData.price > 0 && (
                  <div className="mb-6 rounded-lg border bg-gray-50/50 p-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Price per ticket</span>
                      <span className="font-medium">₹{eventData.price}</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Quantity</span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setTickets((t) => Math.max(1, t - 1))}
                          disabled={tickets <= 1}
                        >
                          −
                        </Button>
                        <span className="w-4 text-center font-semibold">
                          {tickets}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            setTickets((t) =>
                              Math.min(eventData.availableTickets, t + 1)
                            )
                          }
                          disabled={tickets >= eventData.availableTickets}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="shadow-primary/25 w-full text-lg font-semibold shadow-lg transition-all hover:scale-[1.02]"
                  disabled={eventData.availableTickets === 0}
                >
                  {eventData.price > 0 ? "Book Tickets Now" : "Register Free"}
                </Button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  {eventData.availableTickets} tickets remaining for this event
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Heart className="h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
