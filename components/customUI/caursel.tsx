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
    <Carousel
      className="
        relative w-full overflow-hidden
        h-[35vh] sm:h-[45vh] lg:h-[60vh]
      "
    >
      {/* Prev Button */}
      <CarouselPrevious className="realtive left-3 top-1/2 -translate-y-1/2 z-10 ml-6" />

      <CarouselContent className="realtive h-[45vh] sm:h-[45vh] lg:h-[60vh] m-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-full">
            <Card className="h-full w-full">
              <CardContent className="flex h-full w-full items-center justify-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  {index + 1}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Next Button */}
      <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 mx-2 mr-2" />
    </Carousel>
  );
}
