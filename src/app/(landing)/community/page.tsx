"use client";

import { useState } from "react";
import { Users, Heart, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { groups, programs } from "@/constants";
import TabButtons from "@/components/TabButtons";
import { ShowcaseCard } from "@/components/ShowcaseCard";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("groups");

  const tabs = [
    { id: "groups", label: "Community Groups", icon: Users },
    { id: "programs", label: "Programs & Ministries", icon: Heart },
  ];

  return (
    <section className="bg-white min-h-screen py-12 sm:py-16 px-5 md:px-16 text-[#0D090A]">
      <div className="max-screen-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-semibold text-[#0D090A] mb-4">
            Our Community
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
            We believe that faith grows best in community. Discover the many
            ways to connect, serve, and grow together in our church family.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
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
        <div className="min-h-[600px]">
          {/* Groups */}
          {activeTab === "groups" && (
            <div>
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#0D090A] mb-3">
                  Join a Community Group
                </h2>
                <p className="text-base sm:text-lg text-gray-700 px-4">
                  Find your place in our church family through small groups
                  designed for connection and spiritual growth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {groups.map((group, index) => (
                  <ShowcaseCard
                    key={index}
                    icon={group.icon}
                    title={group.name}
                    subtitle={`${group.members} members`}
                    description={group.description}
                    metadata={[
                      { icon: Clock, label: group.schedule },
                      { icon: MapPin, label: group.location },
                      { icon: Users, label: `Led by ${group.leader}` },
                    ]}
                    action={{ label: "Join Group" }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Programs */}
          {activeTab === "programs" && (
            <div>
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#0D090A] mb-3">
                  Programs & Ministries
                </h2>
                <p className="text-base sm:text-lg text-gray-700 px-4">
                  Discover ways to serve, learn, and make a difference through
                  our various ministries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {programs.map((program, index) => (
                  <ShowcaseCard
                    key={index}
                    icon={program.icon}
                    title={program.name}
                    description={program.description}
                    tags={program.opportunities}
                    footer={
                      <p className="text-xs sm:text-sm text-[#0D090A]">
                        Contact:{" "}
                        <span className="text-[#D4AF37] font-semibold break-all">
                          {program.contact}
                        </span>
                      </p>
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-50 to-[#FAF7EB] rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#0D090A] mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-lg sm:text-xl text-[#0D090A] mb-6 px-4">
            We&apos;d love to help you find your place in our community. Reach
            out to us today!
          </p>
          <p className="text-sm sm:text-base text-[#0D090A] px-4">
            <strong>Have questions?</strong> Contact our church office at{" "}
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
              +1 (234) 567-890
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
