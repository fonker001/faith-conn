import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

// type QuickCardsProps = {
//   title: string;
//   subtitle: string;
// };

// function QuickCards({ title, subtitle }: QuickCardsProps) {
//   return (
//     <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
//       <div className="text-white/70 text-xs uppercase tracking-wide">
//         {title}
//       </div>
//       <div className="text-white font-medium">{subtitle}</div>
//     </div>
//   );
// }

export default function HeroSection() {
  return (
    <section
      className="relative w-full 
                 min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]
                 flex flex-col justify-center items-center 
                 pt-16 sm:pt-20 md:pt-24 lg:pt-28
                 pb-12 sm:pb-16 md:pb-20 lg:pb-24
                 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 
                 overflow-hidden"
      style={{
        backgroundImage: `

      linear-gradient(to bottom right, #FEEBC8, #FBD38D, #FAF7EB)
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Image using next/image */}
      <Image
        src="https://images.pexels.com/photos/31528486/pexels-photo-31528486.jpeg"
        alt="Church building showcasing our parish community"
        fill
        className="object-cover w-full h-full"
        priority
      />

      {/* Simple Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Subtle Grid Pattern - Only on larger screens */}
      <div
        className="absolute inset-0 opacity-10 hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content Container - Focused and concise */}
      <div
        className="relative text-center 
                     max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 
                     mx-auto text-white z-10"
      >
        {/* Main Heading - More modest sizing */}
        <h1
          className="mb-4 sm:mb-6 md:mb-8 lg:mb-10
                      text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                      font-heading font-bold 
                      leading-tight
                      tracking-wide"
        >
          St. Francis of Assisi
          <span className="block sm:inline"> Ruiru Parish</span>
        </h1>

        {/* Subtitle - Concise and informative */}
        <p
          className="mb-6 sm:mb-8 md:mb-10 lg:mb-12
                     text-sm sm:text-base md:text-lg lg:text-xl 
                     leading-relaxed
                     max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl 
                     mx-auto px-2 sm:px-0
                     text-white/90"
        >
          Access parish news, join groups, and grow in faith with your community
          through our simple, powerful platform.
        </p>

        {/* Single Primary CTA - Clear action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="#about">
            <Button
              className="w-full sm:w-auto 
                       bg-[#D4AF37] hover:bg-[#C19B26] 
                       px-6 sm:px-8 md:px-10 lg:px-12
                       py-3 sm:py-4 md:py-5 
                       text-sm sm:text-base md:text-lg
                       font-semibold text-white
                       rounded-xl md:rounded-2xl
                       transition-all duration-300
                       hover:scale-105 hover:shadow-lg
                       min-w-[140px] sm:min-w-[160px]"
            >
              Get Started
            </Button>
          </Link>

          <Link href="#features">
            <Button
              variant="outline"
              className="w-full sm:w-auto 
                       bg-transparent hover:bg-white/10 
                       border-2 border-white/40 hover:border-white/60
                       px-6 sm:px-8 md:px-10 lg:px-12
                       py-3 sm:py-4 md:py-5 
                       text-sm sm:text-base md:text-lg
                       font-medium text-white hover:text-white
                       rounded-xl md:rounded-2xl
                       transition-all duration-300
                       min-w-[140px] sm:min-w-[160px]"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
