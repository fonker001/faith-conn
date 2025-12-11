import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 
                 py-16 text-[#0D090A]"
    >
      {/* Content Container */}
      <div className="relative text-center max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Improved heading hierarchy and spacing */}
        <div className="mb-6">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-heading font-medium leading-[1.1] sm:leading-tight tracking-wide">
            Your parish
          </h1>
          <h1 className="mt-2 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-heading font-medium leading-[1.1] sm:leading-tight tracking-wide">
            Connected online
          </h1>
        </div>

        {/* Improved paragraph spacing and responsiveness */}
        <p
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 
                      text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                      leading-relaxed tracking-wide 
                      max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 
                      mx-auto px-2 sm:px-0"
        >
          Access parish news, join groups, and grow in faith with your
          community. Connect with fellow parishioners through a simple, powerful
          platform.
        </p>

        {/* Improved button layout and sizing */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <Link href="/sign_up">
            <Button
              variant="ghost"
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#C19B26] 
                       px-6 sm:px-8 md:px-10 lg:px-12
                       py-3 sm:py-4 md:py-5 
                       text-sm sm:text-base md:text-lg
                       rounded-xl md:rounded-2xl
                       transition-all duration-300
                       font-medium
                       min-w-[120px] sm:min-w-[140px] md:min-w-40"
            >
              Join now
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              className="w-full sm:w-auto 
                       border border-gray-300 hover:bg-gray-50 
                       px-6 sm:px-8 md:px-10 lg:px-12
                       py-3 sm:py-4 md:py-5 
                       text-sm sm:text-base md:text-lg
                       rounded-xl md:rounded-2xl
                       transition-all duration-300
                       font-medium
                       min-w-[120px] sm:min-w-[140px] md:min-w-40"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
