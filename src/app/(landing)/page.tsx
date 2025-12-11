import AboutSection from "@/components/landing_features/AboutSection";
import CTASection from "@/components/CTASection";
import FeatureSection from "@/components/landing_features/FeatureSection";
import HeroSection from "@/components/landing_features/HeroSection";
import NewsSection from "@/components/landing_features/NewsSection";
import TestimonialSection from "@/components/landing_features/TestimonialSection";
import React from "react";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Feature Section */}
      <FeatureSection />

      {/* Announcements Section */}
      <NewsSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Call to Action Section */}
      <CTASection />
    </>
  );
}
