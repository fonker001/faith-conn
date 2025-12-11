"use client";

import TabButtons from "@/components/TabButtons";
import { leadership, moreInfo, parishes } from "@/constants";
import { Church, Info, MapPin, Users } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function QuickCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-[#FAF7EB] p-6 rounded-lg text-center">
      <div className="text-4xl font-bold text-[#D4AF37] mb-2">{title}</div>
      <div className="text-gray-700">{subtitle}</div>
    </div>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("leadership");
  const tabs = [
    { id: "leadership", label: "Church Leadership", icon: Users },
    { id: "parishes", label: "Our Parishes", icon: MapPin },
    { id: "info", label: "More Information", icon: Info },
  ];
  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 px-6 md:px-16 text-[#0D090A]">
        <div className="max-screen-2xl mx-auto">
          {/* History Section */}
          <div className="mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 gap-3">
              <Church className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37]" />
              <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D090A] text-center">
                Our History
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-12">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <p className="text-[#0D090A] leading-relaxed mb-6">
                  Founded in 1895, our church has been a beacon of faith and
                  hope in the community for over 125 years. What began as a
                  small gathering of faithful believers in a modest chapel has
                  grown into a vibrant congregation that spans multiple parishes
                  and touches thousands of lives each year.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-6 sm:my-8">
                  <QuickCard title="1895" subtitle="Established" />
                  <QuickCard title="4" subtitle="Parishes" />
                  <QuickCard title="3000+" subtitle="Members" />
                </div>

                <p className="text-[#0D090A] leading-relaxed mb-6">
                  Through times of prosperity and challenge, our church has
                  remained steadfast in its mission to serve God and our
                  neighbors. We&apos;ve weathered two world wars, economic
                  depressions, and social upheavals, always emerging stronger
                  and more united in our faith.
                </p>

                <p className="text-[#0D090A] leading-relaxed">
                  Today, we continue to honor our rich heritage while embracing
                  the future with open hearts and minds. Our commitment to
                  worship, education, fellowship, and service remains as strong
                  as ever, guided by the timeless principles of love,
                  compassion, and faith that have sustained us through the
                  generations.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-center text-[#0D090A] mb-6 sm:mb-8">
              Learn More About Us
            </h2>

            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {tabs.map((tab) => (
                <TabButtons
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  isActive={activeTab === tab.id}
                  onClick={setActiveTab}
                />
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12 min-h-[400px]">
              {activeTab === "leadership" && (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-[#0D090A] mb-6">
                    Our Leadership Team
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {leadership.map((leader, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="text-4xl sm:text-5xl flex-shrink-0">
                            {leader.image}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-bold text-[#0D090A] break-words">
                              {leader.name}
                            </h4>
                            <p className="text-[#D4AF37] font-semibold mb-2 text-sm sm:text-base">
                              {leader.position}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                              {leader.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "parishes" && (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-[#0D090A] mb-6">
                    Our Parish Locations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {parishes.map((parish, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-[#D4AF37] bg-gray-50 rounded-r-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                      >
                        <h4 className="text-lg sm:text-xl font-bold text-[#0D090A] mb-3 break-words">
                          {parish.name}
                        </h4>
                        <div className="space-y-2 text-gray-700">
                          <p className="flex items-start text-sm sm:text-base">
                            <MapPin className="w-4 h-4 mr-2 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <span className="break-words">
                              {parish.location}
                            </span>
                          </p>
                          <p className="text-sm sm:text-base">
                            <span className="font-semibold">Established:</span>{" "}
                            {parish.established}
                          </p>
                          <p className="text-sm sm:text-base">
                            <span className="font-semibold">
                              Service Times:
                            </span>{" "}
                            {parish.services}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "info" && (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-[#0D090A] mb-6">
                    Additional Information
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    {moreInfo.map((info, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                      >
                        <h4 className="text-lg sm:text-xl font-bold text-[#0D090A] mb-3">
                          {info.title}
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                          {info.content}
                        </p>
                      </div>
                    ))}
                    <div className="bg-[#FAF7EB] border-l-4 border-[#D4AF37] rounded-r-lg p-4 sm:p-6 mt-6 sm:mt-8">
                      <p className="font-semibold mb-2 text-[#0D090A] text-sm sm:text-base">
                        Want to Learn More?
                      </p>
                      <p className="text-sm sm:text-base text-[#0D090A]">
                        <strong>Have questions?</strong> Contact our church
                        office at{" "}
                        <Link
                          href="mailto:info@church.org"
                          className="text-[#D4AF37] hover:underline break-all"
                        >
                          info@church.org
                        </Link>{" "}
                        or call us at{" "}
                        <Link
                          href="tel:+1234567890"
                          className="text-[#D4AF37] hover:underline whitespace-nowrap"
                        >
                          (123) 456-7890
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
