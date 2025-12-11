"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsSection() {
  return (
    <section
      className="px-4 sm:px-6 md:px-16 2xl:px-20
                  py-16 text-[#0D090A] bg-[#FAF7EB]"
    >
      {/* Content Container */}
      <div className="max-screen-2xl mx-auto">
        <div
          className="grid grid-cols-1 lg:grid-cols-2
                     items-start gap-8 "
        >
          {/* LEFT COLUMN – TEXT */}
          <div className="space-y-4 order-2 lg:order-1">
            <span className="inline-block text-sm sm:text-base md:text-lg font-semibold text-gray-600 uppercase tracking-wider">
              News
            </span>

            <h2
              className="font-heading
                         text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl
                         font-medium leading-[1.1] sm:leading-tight"
            >
              <span className="block lg:inline xl:block 2xl:inline">
                General announcements
              </span>{" "}
              and{" "}
              <span className="block lg:inline xl:block 2xl:inline">
                Parish news
              </span>
            </h2>

            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed
                         text-gray-700 max-w-none lg:max-w-xl xl:max-w-2xl"
            >
              Stay updated with the latest events, activities, and important
              information from our parish community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row items-start justify-start gap-3 sm:gap-4 md:gap-5 pt-4">
              <Link href="/general_announcements">
                <Button
                  variant="ghost"
                  className="w-full xs:w-auto
                             border border-gray-300 hover:bg-gray-50
                             px-6 sm:px-8 md:px-10
                             py-3 sm:py-4
                             text-sm sm:text-base md:text-lg
                             transition-all duration-300
                             rounded-xl sm:rounded-2xl
                             font-medium
                             min-w-[120px]"
                >
                  General
                </Button>
              </Link>

              <Link href="/parish_announcements">
                <Button
                  variant="ghost"
                  className="w-full xs:w-auto
                             hover:bg-gray-50
                             px-6 sm:px-8 md:px-10
                             py-3 sm:py-4
                             text-sm sm:text-base md:text-lg
                             transition-all duration-300
                             rounded-xl sm:rounded-2xl
                             font-medium
                             min-w-[120px]
                             flex items-center justify-center gap-2"
                >
                  Parish
                  <ChevronRight
                    size={16}
                    className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                  />
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN – IMAGE */}
          <div className="w-full order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] max-h-[600px] rounded-xl overflow-hidden mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1613098931538-fc822fc21222?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=697"
                alt="Church building showcasing our parish community"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
