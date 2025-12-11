import React from "react";
import { MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "../../../ui/card";
import Image from "next/image";

interface BranchProps {
  branch: {
    id: number;
    name: string;
    image?: string;
    location?: {
      address?: string;
      city?: string;
      state?: string;
      country?: string;
    };
    pastor?: string;
    serviceTimes?: string[];
    contact?: {
      phone?: string;
      email?: string;
      website?: string;
    };
  };
}

const Branch: React.FC<BranchProps> = ({ branch }) => {
  return (
    <div className="h-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-1 dark:text-gray-100">
        Branch Overview
      </h2>

      <Card className="h-auto border-[#D4AF37]/20 bg-white shadow-sm hover:shadow-md transition-shadow text-[#0D090A] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
        <CardContent className="p-4 sm:p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Branch Image + Name + Pastor */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 sm:mb-5">
              <Image
                src={branch.image || "/images/church.jpg"}
                alt={branch.name}
                width={150}
                height={150}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full flex-shrink-0 border-2 border-gray-200 dark:border-gray-600"
              />

              <div className="text-center sm:text-left flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 break-words">
                  {branch.name}
                </h3>

                {branch.pastor && (
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {branch.pastor}
                  </p>
                )}
              </div>
            </div>

            {/* Location + Service Times */}
            <div className="space-y-5 text-sm sm:text-base">
              {/* Location */}
              {branch.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Location:</span>
                    <p className="text-gray-600 break-words dark:text-gray-300">
                      {branch.location.address}, {branch.location.city}
                    </p>
                  </div>
                </div>
              )}

              {/* Service Times */}
              {branch.serviceTimes && branch.serviceTimes.length > 0 && (
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Service Times:</span>
                    <p className="text-gray-600 dark:text-gray-300">
                      {branch.serviceTimes.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          {branch.contact && (
            <div className="mt-5 pt-2 border-t border-gray-100 dark:border-gray-700">
              {branch.contact.phone && (
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {branch.contact.phone}
                </p>
              )}

              {branch.contact.email && (
                <p className="break-all">
                  <span className="font-semibold">Email:</span>{" "}
                  {branch.contact.email}
                </p>
              )}

              {branch.contact.website && (
                <p className="break-all">
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={branch.contact.website}
                    className="text-blue-500 hover:text-blue-700 underline dark:text-blue-300 dark:hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {branch.contact.website}
                  </a>
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Branch;
