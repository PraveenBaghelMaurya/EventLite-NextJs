"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Tech Conference",
    image: "/placeholder-event.jpg",
    price: 0,
    description: "A conference about modern web technologies.",
    startDate: "2026-02-10",
    endDate: "2026-02-12",
    venue: "Expo Center",
    city: "Delhi",
    state: "India",
  },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const CategoriesPage = () => {
  const params = useParams<{ categories: string }>();
  const slug = params.categories;
 console.log("Params:",params)
  console.log("Slug:", slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold capitalize">{slug} Events</h1>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="group relative h-full overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoriesPage;
