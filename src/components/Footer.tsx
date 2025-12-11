import { copyRightNotice } from "@/lib/copyRightYear";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="w-full px-4 sm:px-8 lg:px-16 text-[#0D090A]">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-4 py-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer">
                  FaithConnect
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center flex-wrap gap-4 sm:gap-6 lg:gap-8">
              <Link
                href="/about"
                className="text-sm sm:text-base hover:text-[#D4AF37] transition-colors"
              >
                About
              </Link>
              <Link
                href="/community"
                className="text-sm sm:text-base hover:text-[#D4AF37] transition-colors"
              >
                Community
              </Link>
              <Link
                href="/general_announcements"
                className="text-sm sm:text-base hover:text-[#D4AF37] transition-colors"
              >
                Announcements
              </Link>
              <Link
                href="/groups"
                className="text-sm sm:text-base hover:text-[#D4AF37] transition-colors"
              >
                My Groups
              </Link>
              <Link
                href="/catechism"
                className="text-sm sm:text-base hover:text-[#D4AF37] transition-colors"
              >
                Catechism
              </Link>
            </div>
          </div>

          {/* Bottom Section with Copyright and Legal Links */}
          <div className="border-t border-[#0D090A]/15 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4">
              {/* Copyright Notice */}
              <p className="text-xs sm:text-sm text-[#0D090A]/70 order-2 md:order-1">
                {copyRightNotice()} Faith Connect. All rights reserved.
              </p>

              {/* Legal Links */}
              <nav
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 order-1 md:order-2"
                aria-label="Legal and privacy links"
              >
                <Link
                  href="/privacy"
                  className="text-xs sm:text-sm  hover:text-[#D4AF37] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs sm:text-sm  hover:text-[#D4AF37] transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-xs sm:text-sm  hover:text-[#D4AF37] transition-colors"
                >
                  Cookie Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Optional: Social Media Section for Mobile */}
          <div className="sm:hidden border-t border-[#0D090A]/15 py-4">
            <div className="flex items-center justify-center gap-6">
              {/* Add social media icons here if needed */}
              <div className="text-xs text-center text-[#0D090A]/50">
                Connect with our community
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
