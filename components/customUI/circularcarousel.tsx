"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getOrganizerResponse } from "@/services/interface/event";

interface CircularCarouselProps {
  organizers: getOrganizerResponse[];
}

export default function CircularCarousel({ organizers }: CircularCarouselProps) {
  return (
    <Carousel className="relative w-full">
      <CarouselContent className="ml-20">
        {organizers.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full shadow-lg">
                <CardContent className="flex h-full w-full items-center justify-center p-0">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="px-1 text-center text-xs font-semibold">
                      {item.name}
                    </span>
                  )}
                </CardContent>
              </Card>
              <div className="mt-2 w-32 truncate text-center text-sm font-medium">
                {item.name}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-3 z-10 -translate-y-1/2" />
      <CarouselNext className="absolute top-1/2 right-3 z-10 mr-4 -translate-y-1/2" />
    </Carousel>
  );
}
