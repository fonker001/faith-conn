"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

import Branch from "@/components/dashboard/member/dashboard_features/branch";
import Schedule from "@/components/dashboard/member/dashboard_features/schedule";
import CalendarComponent from "@/components/dashboard/member/dashboard_features/calendar";
import { getProfile } from "@/services/profileService";
import { MemberProfile } from "@/types/types";
import outstations from "@/constants/outstations";

export default function UserDashboard() {
  const router = useRouter();
  const { user, accessToken, setUser } = useAuthStore((state) => state);
  const [profile, setProfile] = useState<MemberProfile | null>(null);

  // Hydrate store from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("accessToken");

    if (!user && email) {
      setUser({ email } as MemberProfile);
    }

    if (!token) {
      router.replace("/login");
      return;
    }
  }, [user, setUser, router]);

  // Fetch full profile once accessToken exists
  useEffect(() => {
    if (!accessToken) return;

    getProfile()
      .then((data) => {
        setProfile(data);
        setUser(data); // update store
      })
      .catch((err) => console.error("Failed to fetch profile", err));
  }, [accessToken, setUser]);

  // Directly read the outstation from profile
  const userOutstation = profile
    ? outstations.find((o) => o.name === profile.outstation_name)
    : null;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {userOutstation && <Branch branch={userOutstation} />}
          {profile && <CalendarComponent profile={profile} />}
          <Schedule />
        </div>
      </div>
    </section>
  );
}
