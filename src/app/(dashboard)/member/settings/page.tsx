import GeneralSettings from "@/components/settings_features/general-settings";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)] ">
      <GeneralSettings />
    </div>
  );
}
