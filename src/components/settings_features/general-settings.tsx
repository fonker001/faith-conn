"use client";

import React, { useEffect, useState } from "react";
import { Cross } from "lucide-react";
import ThemeContext from "@/lib/ThemeContext";

// If ThemeContext is actually a *component*, rename it to `ThemeSelector` or similar
// and import it as a React component, not as a context object.
// Example: import ThemeSelector from "@/lib/ThemeContext";

const GeneralSettings: React.FC = () => {
  const [timezones, setTimezones] = useState<string[]>([]);

  function getSupportedTimeZones(): string[] {
    const intl = Intl as unknown as {
      supportedValuesOf?: (key: string) => string[];
    };
    return typeof intl.supportedValuesOf === "function"
      ? intl.supportedValuesOf("timeZone")
      : [];
  }

  /** Returns initial timezone — prefers Africa/Nairobi if supported */
  const getInitialTimezone = (): string => {
    const preferred = "Africa/Nairobi";
    const supported = getSupportedTimeZones();

    if (supported.includes(preferred)) return preferred;

    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  };

  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    getInitialTimezone()
  );

 useEffect(() => {
   try {
     const intl = Intl as unknown as {
       supportedValuesOf?: (key: string) => string[];
     };

     const tz: string[] =
       typeof intl.supportedValuesOf === "function"
         ? intl.supportedValuesOf("timeZone")
         : [];

     setTimezones(Array.isArray(tz) && tz.length ? tz : []);
   } catch {
     setTimezones([]);
   }
 }, []);


  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const tz = event.target.value;
    setSelectedTimezone(tz);
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      timeZoneName: "short",
    };

    try {
      const time = new Intl.DateTimeFormat("en-KE", options).format(date);
      console.log(`Current time in ${tz}: ${time}`);
    } catch (err) {
      console.warn(
        `Invalid timeZone specified (${tz}), falling back to UTC.`,
        err
      );
      const fallbackOptions: Intl.DateTimeFormatOptions = {
        timeZone: "UTC",
        timeZoneName: "short",
      };
      const time = new Intl.DateTimeFormat("en-KE", fallbackOptions).format(
        date
      );
      console.log(`Current time in UTC: ${time}`);
      setSelectedTimezone("UTC");
    }
  };

  const getInitials = (name: string): string => {
    const names = name.trim().split(/\s+/);
    return names.length === 1
      ? names[0].charAt(0).toUpperCase()
      : (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  };

  return (
    <div className="general-settings p-1 w-full min-h-[calc(100vh-6rem)] space-y-2">
      {/* Profile Section */}
      <section className="p-4 px-8 bg-white dark:bg-gray-800 rounded-md shadow-md w-full">
        <h2 className="text-xl font-semibold pb-2 dark:text-gray-100">
          Personal Profile
        </h2>
        <div className="flex items-center px-4 w-full pb-2 gap-6">
          <div
            className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow"
            aria-label="Profile avatar"
          >
            {getInitials("John Doe")}
          </div>

          <div className="flex flex-col gap-2 w-2/3">
            <h4 className="font-semibold italic text-xl dark:text-gray-100">
              John Doe
            </h4>
            <p className="text-sm dark:text-gray-300">0712345678</p>
            <p className="font-semibold dark:text-gray-100">
              Bio: <span className="text-sm dark:text-gray-300">bio</span>
            </p>
            <button className="p-2 py-[1px] md:w-40 bg-gray-500 hover:bg-blue-500 text-white rounded-md cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600">
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Parish Info Section */}
      <section className="p-4 px-8 bg-white dark:bg-gray-800 rounded-md shadow-md w-full">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          Parish Identity & Branding
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col space-y-2 mt-4">
            <h3>Parish Name</h3>
            <h3>Diocese</h3>
            <Cross size={30} className="m-auto" />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
              St Michael&apos;s Parish
            </p>
            <p className="p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
              Archistate
            </p>
            <p className="p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
              123, Githunguri, Kiambu
            </p>
          </div>
        </div>
      </section>

      {/* Time & Date Section */}
      <section className="p-4 px-8 bg-white dark:bg-gray-800 rounded-md shadow-md w-full space-y-2">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          Time and Date
        </h2>
        <div className="flex justify-end items-center">
          <p className="p-2 border border-gray-300 rounded-lg md:w-[30%] dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
            Central Street, Limuru, Kiambu
          </p>
        </div>

        <div className="flex justify-between gap-4 items-center">
          <h4>Date Today</h4>
          <p className="p-2 border border-gray-300 rounded-lg md:w-[30%] dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
            {(() => {
              try {
                const now = new Date();
                const options: Intl.DateTimeFormatOptions = {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  timeZone: selectedTimezone,
                };
                return new Intl.DateTimeFormat("en-US", options).format(now);
              } catch {
                return new Date().toLocaleDateString();
              }
            })()}
          </p>
        </div>

        <div className="flex justify-between gap-4 items-center">
          <h4>Time Zone</h4>
          <select
            id="timezone-select"
            value={selectedTimezone}
            onChange={handleTimezoneChange}
            className="p-2 border w-[40%] md:w-[30%] max-sm:text-sm border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200"
          >
            {timezones.length ? (
              timezones.map((tz) => (
                <option
                  key={tz}
                  value={tz}
                  className="dark:bg-gray-800 dark:text-gray-200"
                >
                  {tz}
                </option>
              ))
            ) : (
              <option key="UTC" value="UTC">
                UTC
              </option>
            )}
          </select>
        </div>

        <div className="flex justify-between gap-4 items-center">
          <h4>Day of Week</h4>
          <p className="p-2 border border-gray-300 rounded-lg md:w-[30%] dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
            {(() => {
              try {
                return new Intl.DateTimeFormat("en-KE", {
                  weekday: "long",
                  timeZone: selectedTimezone,
                }).format(new Date());
              } catch (err) {
                console.warn(
                  `Failed to format weekday with timezone '${selectedTimezone}', falling back.`,
                  err
                );
                return new Intl.DateTimeFormat("en-KE", {
                  weekday: "long",
                }).format(new Date());
              }
            })()}
          </p>
        </div>
      </section>

      {/* System Defaults Section */}
      <section className="p-4 px-8 bg-white dark:bg-gray-800 rounded-md shadow-md w-full space-y-2">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          System Defaults
        </h2>
        <div className="flex justify-between gap-4 items-center">
          <h4 className="dark:text-gray-100">Choose Theme</h4>
          <ThemeContext />
        </div>
      </section>
    </div>
  );
};

export default GeneralSettings;
