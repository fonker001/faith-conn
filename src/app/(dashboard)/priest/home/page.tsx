"use client";

// export const dynamic = "force-dynamic";
import LeftPanel from "@/components/dashboard/priest/LeftPanel";
import RightPanel from "@/components/dashboard/priest/RightPanel";
import { TabType } from "@/types/types";
import { useRouter /*, useSearchParams */ } from "next/navigation"; // commented out for build safety
import React from "react";

export default function PriestDashboard() {
  const router = useRouter();
  // const searchParams = useSearchParams(); // commented out because it breaks prerender

  const [activeTab, setActiveTab] = React.useState<TabType>("members");
  const [isReady, setIsReady] = React.useState(false);

  // Load tab from URL or localStorage AFTER client loads
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const rememberTabs = localStorage.getItem("rememberTabs") === "true";

    // Read URL params safely on the client
    const params = new URLSearchParams(window.location.search);
    const urlTab = params.get("tab") as TabType | null;

    if (urlTab) {
      setActiveTab(urlTab);
    } else if (rememberTabs) {
      const saved = localStorage.getItem("activeTab") as TabType | null;
      if (saved) setActiveTab(saved);
    }

    setIsReady(true);
  }, []);

  // Sync localStorage AFTER ready
  React.useEffect(() => {
    if (!isReady) return;
    const rememberTabs = localStorage.getItem("rememberTabs") === "true";
    if (rememberTabs) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab, isReady]);

  // Sync URL AFTER ready
  React.useEffect(() => {
    if (!isReady) return;
    const params = new URLSearchParams(window.location.search);
    params.set("tab", activeTab);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeTab, isReady]);

  if (!isReady) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    <section className="flex h-screen bg-slate-100">
      <LeftPanel setActiveTab={setActiveTab} />
      <RightPanel activeTab={activeTab} setActiveTab={setActiveTab} />
    </section>
  );
}
