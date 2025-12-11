"use client";

import { Calendar, Check, X } from "lucide-react";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveBookingRecordById,
  getAllBookingRecords,
  rejectBookingRecordById,
} from "@/actions/bookings/bookings"; // Adjust path if needed
import { Booking } from "@/types/types";
import { BookingCardSkeleton } from "../BookingCardSkeleton";
import { toast } from "sonner";

export default function BookingSection() {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery<Booking[]>({
    queryKey: ["allBookings"],
    queryFn: getAllBookingRecords,
  });

  // inside your BookingSection component
  const queryClient = useQueryClient();

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: (id: string) => approveBookingRecordById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: (id: string) => rejectBookingRecordById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    },
  });

  const isApproveLoading = approveMutation.status === "pending";
  const isRejectLoading = rejectMutation.status === "pending";

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load bookings");
    }
  }, [isError]);

  if (isLoading)
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Booking Requests
        </h2>

        <div className="grid gap-4">
          <BookingCardSkeleton />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Booking Requests
        </h2>

        <div className="grid gap-4">
          <BookingCardSkeleton />
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Booking Requests
      </h2>

      <div className="grid gap-4">
        {bookings?.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-sm p-6 border border-slate-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {booking.service_type.charAt(0).toUpperCase() +
                      booking.service_type.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : booking.status === "approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  Booking #{booking.id}
                </h3>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                  onClick={() => approveMutation.mutate(booking.id.toString())}
                  disabled={isApproveLoading}
                >
                  <Check size={16} /> Approve
                </button>

                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  onClick={() => rejectMutation.mutate(booking.id.toString())}
                  disabled={isRejectLoading}
                >
                  <X size={16} /> Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
