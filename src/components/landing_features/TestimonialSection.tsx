"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/constants";
import Autoplay from "embla-carousel-autoplay";

export default function TestimonialSection() {
  // Autoplay plugin configuration for carousel
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  return (
    <>
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 text-[#0D090A]">
        {/* Header Section */}
        <div className="text-center mb-10">
          {/* Main Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight mb-4 sm:mb-5 md:mb-6">
            What parishioners say
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto px-4">
            Hear from our community
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-screen-2xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 sm:pl-3 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="h-full border-[#0D090A]/10 hover:border-red-200 transition-all duration-300 hover:shadow-md rounded-xl">
                    <CardContent className="flex flex-col justify-between p-4 sm:p-5 md:p-6 min-h-60 sm:min-h-[260px] md:min-h-[280px]">
                      {/* Quote Icon */}
                      <div className="mb-3">
                        <svg
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-400 opacity-50"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-sm sm:text-base leading-relaxed text-gray-700 mb-4 grow">
                        {testimonial.text}
                      </p>

                      {/* Author Info */}
                      <div className="border-t border-gray-200 pt-3">
                        <p className="font-semibold text-sm sm:text-base text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Mobile Navigation - Centered below carousel */}
            <div className="flex justify-center gap-4 mt-6 md:hidden">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
              <CarouselNext className="relative right-0 top-0 translate-y-0" />
            </div>
          </Carousel>

          {/* Dots Indicator for Mobile/Tablet */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
