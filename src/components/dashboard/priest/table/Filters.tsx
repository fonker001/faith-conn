import { Check, ChevronDown, Search } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

const outStations = [
  "St Charles",
  "St Francis",
  "St Andrew",
  "St Monica",
  "St Gabriel",
];

interface FiltersProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filters({
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
}: FiltersProps) {
  // Current filters
  const nameFilter =
    (columnFilters.find((filter) => filter.id === "email")?.value as string) ||
    "";

  const selectedOutStation =
    (columnFilters.find((filter) => filter.id === "outStation")
      ?.value as string) || "All Outstations";

  // Helper to update filters
  const onFilterChange = (id: string, value: string | null) =>
    setColumnFilters((prev) => {
      const newFilters = prev.filter((filter) => filter.id !== id);
      if (value && value !== "All Outstations") {
        newFilters.push({ id, value });
      }
      return newFilters;
    });

  return (
    <div className="bg-white w-full lg:w-1/2 rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative justify-centerr">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search Member..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-[#D4AF37]/20  "
            value={nameFilter}
            onChange={(e) => {
              const value = e.target.value;
              // onFilterChange("name", value);
              onFilterChange("email", value);
            }}
          />
        </div>

        {/* Outstation dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 ">
            <span>
              {selectedOutStation === "All Outstations"
                ? "All Outstations"
                : selectedOutStation}
            </span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-[#0D090A]/15 bg-white/90 backdrop-blur-lg">
            {/* “All Outstations” option */}
            <DropdownMenuItem
              onClick={() => onFilterChange("outStation", null)}
              className="hover:bg-gray-100 cursor-pointer flex items-center justify-between"
            >
              All Outstations
              {selectedOutStation === "All Outstations" && (
                <Check className="w-4 h-4 text-[#D4AF37]" />
              )}
            </DropdownMenuItem>

            {/* List of outstations */}
            {outStations.map((station) => (
              <DropdownMenuItem
                key={station}
                onClick={() => onFilterChange("outStation", station)}
                className="hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              >
                {station}
                {selectedOutStation === station && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
