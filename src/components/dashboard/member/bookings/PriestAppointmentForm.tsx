"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import BookingForm from "./BookingForm";
import { PriestAppointment } from "@/types/types";
import { createBookingRecord } from "@/actions/bookings/bookings";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function PriestAppointmentForm() {
  const defaultData: PriestAppointment = {
    priest: "Confession",
    service_type: "Confession",
    location: "",
    date: "",
    time: "",
    notes: "",
  };
  const [data, setData] = useState<PriestAppointment>(defaultData);

  // Define mutation
  const mutation = useMutation({
    mutationFn: async (formData: PriestAppointment) => {
      return await createBookingRecord(formData);
    },
    onSuccess: (_, variables) => {
      toast.success(
        `Your appointment request has been sent! Fr. ${variables.priest} will contact you to confirm.`
      );
      setData(defaultData);
    },
    onError: (error: any) => {
      console.error("Booking failed:", error);
      toast.error("Failed to send booking. Please try again.");
    },
  });

  const { user } = useAuthStore.getState();
  const userId = user?.id || 55; // Replace with actual user ID retrieval logic

  // if (!userId) {
  //   toast.error("Cannot submit booking: no member ID found. Please log in again.");
  //   return;
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...data,
      user: userId,
    };

    console.log("Priest Appointment:", payload);

    mutation.mutate(payload);
  };

  return (
    <BookingForm title="Book Priest Appointment" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priest *
          </label>
          <select
            value={data.priest}
            onChange={(e) =>
              setData({
                ...data,
                priest: e.target.value ,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          >
            <option value="Confession">Confession</option>
            <option value="Counseling">Spiritual Counseling</option>
            <option value="Anointing">Anointing of the Sick</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Purpose *
          </label>
          <select
            value={data.service_type}
            onChange={(e) =>
              setData({
                ...data,
                service_type: e.target
                  .value as PriestAppointment["service_type"],
              })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          >
            <option value="Confession">Confession</option>
            <option value="Counseling">Spiritual Counseling</option>
            <option value="Anointing">Anointing of the Sick</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className=" flex flex-col gap-4 col-span-2 md:flex-row md:row-span-2 items-center justify-between">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location *
            </label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferred Date *
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferred Time *
            </label>
            <input
              type="time"
              value={data.time}
              onChange={(e) => setData({ ...data, time: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes (e.g., urgency, special needs)
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
    </BookingForm>
  );
}
