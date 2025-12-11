import React from "react";

interface TabButtonProps<T extends string | number = string> {
  id: T;
  label: string;
  isActive: boolean;
  onClick: (id: T) => void;
  icon?: React.ElementType;
  count?: number;
}


export default function TabButtons<T extends string | number = string>({
  id,
  label,
  isActive,
  onClick,
  icon: Icon,
  count,
}: TabButtonProps<T>) {
  return (
    <button
      key={String(id)}
      onClick={() => onClick(id)}
      className={`flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all text-base sm:text-lg
        ${
          isActive
            ? "bg-[#D4AF37] text-white shadow-lg"
            : "bg-gray-50 text-[#0D090A] hover:bg-gray-100 shadow"
        }
      `}
    >
      {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />}
      <span className="whitespace-nowrap">{label}</span>
      {typeof count === "number" && (
        <span
          className={`ml-2 px-2 py-1 rounded-full text-sm ${
            isActive ? "bg-white text-[#D4AF37]" : "bg-gray-200 text-gray-700"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
