import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { processCards } from "@/constants";
import Link from "next/link";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 
                 py-16
                 text-[#0D090A]"
    >
      {/* Header Section - Improved spacing and typography */}
      <div className="text-center mb-10">
        {/* Process Badge */}
        <span className="inline-block text-sm sm:text-base md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
          Connect
        </span>

        {/* Main Heading - Improved responsive typography */}
        <div className="mb-6">
          <h1
            className="font-heading
                        text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
                        font-medium leading-[1.1] sm:leading-tight"
          >
            What you can do
          </h1>
        </div>

        {/* Subheading - Improved constraint and spacing */}
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-0">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-700">
            Discover powerful features to strengthen your parish connection
          </p>
        </div>
      </div>

      {/* Process Cards Container - Improved responsive grid */}
      <div className="max-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-3">
          {processCards.map((card) => (
            <Card
              key={card.title}
              className="bg-white 
    rounded-2xl lg:rounded-3xl
    overflow-hidden 
    border border-[#0D090A]/10 hover:border-[#0D090A]/20
    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
    group p-0"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-40 sm:h-48 md:h-44 lg:h-48 xl:h-52 2xl:h-56 overflow-hidden shrink-0">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 md:p-6 lg:p-6 xl:p-8 2xl:p-10">
                {/* Category Label */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider text-gray-600">
                    {card.category}
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  className="font-heading
        text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl
        font-medium 
        mb-3 sm:mb-4 md:mb-4 lg:mb-5 xl:mb-6
        leading-tight"
                >
                  {card.title}
                </h3>

                {/* Card Description */}
                <p
                  className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg
       leading-relaxed text-gray-700
       mb-4 sm:mb-6 md:mb-6 lg:mb-8 xl:mb-10"
                >
                  {card.description}
                </p>

                {/* CTA Button */}
                <Link href="/user/home">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-start
       font-medium 
       transition-all duration-300
       text-xs sm:text-sm md:text-base lg:text-base xl:text-lg
       hover:bg-gray-50 hover:text-[#D4AF37]
       px-0 py-0 h-auto
       group-hover:translate-x-2
       w-full sm:w-auto"
                  >
                    <span className="mr-2">{card.buttonLabel}</span>
                    <ChevronRight
                      size={16}
                      className="sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
