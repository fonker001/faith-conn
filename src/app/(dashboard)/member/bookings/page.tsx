"use client";

import { useState } from "react";
import BookingTabs from "@/components/dashboard/member/bookings/BookingTabs";
import CatechismBookingForm from "@/components/dashboard/member/bookings/CatechismBookingForm";
import PriestAppointmentForm from "@/components/dashboard/member/bookings/PriestAppointmentForm";

type BookingTab = "priest" | "catechism";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingTab>("priest");

  const renderForm = () => {
    switch (activeTab) {
      case "priest":
        return <PriestAppointmentForm />;
      case "catechism":
        return <CatechismBookingForm />;
      default:
        return <PriestAppointmentForm />;
    }
  };

  const forms = {
    priest: <PriestAppointmentForm />,
    catechism: <CatechismBookingForm />,
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Book a Service
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Request catechism classes, priest appointments, event attendance, or
          other parish services.
        </p>
      </div>
      <div>
        {renderForm()}
      </div>

      <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        {forms[activeTab] ?? forms.priest}
      </div>
    </div>
  );
}
