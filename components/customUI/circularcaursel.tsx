'use client'
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CircularCarousel() {
  return (
    <Carousel className="realtive w-full ">
      <CarouselContent className="ml-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
            <Card className="w-32 h-32 rounded-full shadow-lg flex items-center justify-center">
              <CardContent className="p-0 flex items-center justify-center">
                <span className="text-2xl font-semibold">
                  {index + 1}
                </span>
              </CardContent>
            </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="realtive top-1/2 left-3 z-10 -translate-y-1/2" />
      <CarouselNext className="realtive top-1/2 right-3 z-10 mr-4 -translate-y-1/2" />
    </Carousel>
  );
}
