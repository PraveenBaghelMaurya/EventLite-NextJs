import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselDemo() {
  return (
    <Carousel className="relative h-[35vh] w-full overflow-hidden sm:h-[45vh] lg:h-[60vh]">
      {/* Prev Button */}
      <CarouselPrevious className="realtive top-1/2 left-3 z-10 ml-6 -translate-y-1/2" />

      <CarouselContent className="realtive m-6 h-[45vh] sm:h-[45vh] lg:h-[60vh]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-full">
            <Card className="h-full w-full">
              <CardContent className="flex h-full w-full items-center justify-center">
                <span className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  {index + 1}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Next Button */}
      <CarouselNext className="absolute top-1/2 right-3 z-10 mx-2 mr-2 -translate-y-1/2" />
    </Carousel>
  );
}
