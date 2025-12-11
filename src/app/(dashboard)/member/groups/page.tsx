"use client";
import { useState } from "react";
import { Users, Calendar } from "lucide-react";
import { ShowcaseCard } from "@/components/ShowcaseCard";
import TabButtons from "@/components/TabButtons";

interface Group {
  id: number;
  title: string;
  description: string;
  subtitle: string;
  date: string;
}

const mockGroups: Group[] = [
  {
    id: 1,
    title: "Youth Choir",
    description: "Weekly choir practice and Sunday Mass singing.",
    subtitle: "Leader: John Doe",
    date: "Every Saturday 4PM",
  },
  {
    id: 2,
    title: "St. Vincent de Paul",
    description: "Community outreach and charity activities.",
    subtitle: "Leader: Jane Doe",
    date: "Every 1st Sunday",
  },
  {
    id: 3,
    title: "Legion of Mary",
    description: "Faith-based group focusing on prayer and community support.",
    subtitle: "Leader: Mary Wanjiku",
    date: "Every Wednesday 6PM",
  },
];

type FilterType = "all" | "joined" | "available";

export default function GroupsPage() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
 const [activeFilter, setActiveFilter] = useState<FilterType>("all");

 const tabs: { key: FilterType; label: string }[] = [
   { key: "all", label: "All" },
   { key: "joined", label: "Joined" },
   { key: "available", label: "Available" },
 ];


  const toggleJoin = (id: number) => {
    setJoinedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };



  const filteredGroups =
    activeFilter === "all"
      ? mockGroups
      : activeFilter === "joined"
      ? mockGroups.filter((g) => joinedGroups.includes(g.id))
      : mockGroups.filter((g) => !joinedGroups.includes(g.id));

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <ol className="flex gap-2">
            <li className="text-gray-900 font-medium dark:text-gray-100">
              Groups
            </li>
          </ol>
        </div>

        {/* Filters */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">
            Quick Links
          </h2>
          <div
            className="grid grid-cols-2 gap-4
                sm:grid-cols-3
                lg:grid-cols-4
                "
          >
            {tabs.map(({ key, label }) => (
              <TabButtons<FilterType>
                key={key}
                id={key}
                label={label}
                isActive={activeFilter === key}
                onClick={(id) => setActiveFilter(id)} // ✅ now id has correct type
              />
            ))}
          </div>
        </section>

        {/* Groups Showcase Grid */}
        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            Parish Groups
          </h2>

          {filteredGroups.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No groups found.</p>
          ) : (
            <div
              className="
                grid gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                items-stretch
              "
            >
              {filteredGroups.map((group) => (
                <ShowcaseCard
                  key={group.id}
                  title={group.title}
                  subtitle={group.subtitle}
                  description={group.description}
                  metadata={[
                    {
                      icon: Calendar,
                      label: group.date,
                    },
                    {
                      icon: Users,
                      label: joinedGroups.includes(group.id)
                        ? "You have joined"
                        : "Available to join",
                    },
                  ]}
                  tags={
                    joinedGroups.includes(group.id)
                      ? ["Member"]
                      : ["Open Group"]
                  }
                  buttonLabel={
                    joinedGroups.includes(group.id) ? "Joined" : "Join Group"
                  }
                  onButtonClick={() => toggleJoin(group.id)}
                  buttonVariant={
                    joinedGroups.includes(group.id) ? "success" : "primary"
                  } // optional if ShowcaseCard supports variants
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
