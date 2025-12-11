"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { branches } from "@/constants/branches";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsExploreOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsExploreOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsExploreOpen(false);
  };

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/community", label: "Community" },
    { href: "/general_announcements", label: "Announcements" },
  ];

  const outStationLinks = branches.map((branch) => ({
    href: `/outstations/${branch.id}`,
    label: branch.name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()), // converts "st-marys" → "St Marys"
  }));

  const NavLink = ({
    href,
    label,
    onClick,
  }: {
    href: string;
    label: string;
    onClick?: () => void;
  }) => (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm sm:text-base lg:text-lg hover:text-[#D4AF37] transition-colors"
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div
          className="max-w-7xl mx-auto h-14 sm:h-16 md:h-18
                  flex items-center justify-between text-[#0D090A] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0 "
        >
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" onClick={closeMobileMenu}>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium cursor-pointer truncate">
                FaithConnect
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="space-x-5">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <NavLink {...link} />
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Explore Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm sm:text-base lg:text-lg hover:text-[#D4AF37] transition-colors font-normal">
                    OutStations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border border-[#0D090A]/15 bg-white/90 backdrop-blur-lg">
                    <ul className="grid w-[220px] gap-5 p-2">
                      {outStationLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <NavLink {...link} />
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Login Button */}
            <Link href="/login" onClick={closeMobileMenu}>
              <Button
                size="sm"
                className="bg-[#D4AF37] hover:bg-[#B8941F] rounded-lg 
                   px-3 py-1.5 text-xs sm:text-sm 
                   lg:px-4 lg:py-2 lg:text-base 
                   transition-colors whitespace-nowrap"
              >
                Login
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              onClick={toggleMobileMenu}
              className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-white/20 transition-colors touch-manipulation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ top: "3.5rem" }} // Adjust based on navbar height
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div className="relative ml-auto w-full max-w-sm h-full bg-white/95 backdrop-blur-lg shadow-xl border-l border-white/20">
          {/* Menu Content */}
          <div className="overflow-y-auto h-full pb-20">
            <div className="px-4 py-6 space-y-2">
              <Link
                href="/about"
                className="flex items-center px-4 py-3 text-base font-medium hover:bg-black/5 rounded-lg transition-colors touch-manipulation"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <Link
                href="/community"
                className="flex items-center px-4 py-3 text-base font-medium hover:bg-black/5 rounded-lg transition-colors touch-manipulation"
                onClick={closeMobileMenu}
              >
                Community
              </Link>

              <Link
                href="/general_announcements"
                className="flex items-center px-4 py-3 text-base font-medium hover:bg-black/5 rounded-lg transition-colors touch-manipulation"
                onClick={closeMobileMenu}
              >
                Announcements
              </Link>

              {/* Mobile Explore Section */}
              <div className="space-y-1">
                <button
                  onClick={toggleExplore}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium hover:bg-black/5 rounded-lg transition-colors touch-manipulation"
                  aria-expanded={isExploreOpen}
                >
                  OutStations
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      isExploreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${
                    isExploreOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 space-y-1 border-l-2 border-[#D4AF37] ">
                    <ul>
                      {outStationLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="flex items-center px-4 py-3 text-base font-medium hover:bg-black/5 rounded-lg transition-colors touch-manipulation"
                            onClick={closeMobileMenu}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content overlap */}
      <div className="h-14 sm:h-16 md:h-18" />
    </>
  );
}
