"use client";
import { branches } from "@/constants/branches";
import { Church, Clock, Heart, Info, Link, MapPin, Users } from "lucide-react";
import React, { useState } from "react";
import TabButtons from "../TabButtons";
import { ShowcaseCard } from "../ShowcaseCard";
import Image from "next/image";

type Props = {
  branchId: string;
};

type QuickCardsProps = {
  title: string;
  subtitle: string;
};

function QuickCard({ title, subtitle }: QuickCardsProps) {
  return (
    <div className="bg-[#FAF7EB] p-6 rounded-lg text-center">
      <div className="text-4xl font-bold text-[#D4AF37] mb-2">{title}</div>
      <div className="text-gray-700">{subtitle}</div>
    </div>
  );
}

function QuickInfo({ title, subtitle }: QuickCardsProps) {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
      <div className="text-white text-xs uppercase tracking-wide">{title}</div>
      <div className="text-white font-medium">{subtitle}</div>
    </div>
  );
}

export default function OutstationSection({ branchId }: Props) {
  const branch = branches.find(
    (b) => b.id.toLowerCase() === branchId.toLowerCase()
  );

  const [activeTab, setActiveTab] = useState("leadership");
  const tabs = [
    { id: "leadership", label: "Church Leadership", icon: Users },
    { id: "community", label: "Groups", icon: Heart },
    { id: "info", label: "More Information", icon: Info },
  ];

  if (!branch) {
    return (
      <div className="min-h-fit text-center py-20">
        <h2 className="text-3xl font-semibold">Branch Not Found</h2>
        <p className="text-gray-600 mt-2">
          The branch you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  console.log(branch.image);

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 px-5 md:px-16 text-[#0D090A]">
        <div className="max-screen-2xl mx-auto">
          {/* History Section */}
          <div className="mb-12 sm:mb-16">
            <div className="relative w-full h-64 sm:h-[500px]">
              {/* Background Image */}
              <Image
                src={branch.image}
                alt={branch.name}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center bg-black/55 text-white text-center gap-3">
                <Church className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37]" />
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-semibold text-[#FFF]">
                  {branch.name}
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-12">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <p className="text-[#0D090A] leading-relaxed mb-6">
                  {branch.history}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8">
                  <QuickCard
                    title={branch.established.split("-")[0]}
                    subtitle="Established"
                  />

                  <QuickCard
                    title={branch.address.split(",")[0]}
                    subtitle="Address"
                  />
                </div>

                <div className="grid grids-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {branch.mass?.map((mass, index) => (
                    <QuickInfo
                      key={index}
                      title={mass.day}
                      subtitle={mass.time}
                    />
                  ))}
                </div>

                <p className="text-[#0D090A] leading-relaxed mb-6">
                  {branch.inspirationMessage}
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
                    {branch.leadership.map((leader, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="text-2xl flex-shrink-0">
                            {leader.image}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-bold text-[#0D090A] break-words">
                              {leader.name}
                            </h4>
                            <p className="text-[#D4AF37] font-semibold mb-2 text-sm sm:text-base">
                              {leader.role}
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

              {activeTab === "community" && (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-[#0D090A] mb-6">
                    Community & Groups
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {branch.ministries.map((ministry, index) => (
                      <ShowcaseCard
                        key={index}
                        icon={ministry.icon}
                        title={ministry.name}
                        description={ministry.description}
                        metadata={[
                          { icon: Clock, label: ministry.schedule },
                          { icon: MapPin, label: ministry.location },
                          { icon: Users, label: `Led by ${ministry.leader}` },
                        ]}
                      />
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
                    {branch.moreInfo.map((info, index) => (
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
