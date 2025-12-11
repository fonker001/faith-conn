import { Skeleton } from "@/components/ui/skeleton";

export function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
      <div className="flex justify-between items-start">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          {/* Tags */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-20 rounded-full bg-slate-300" />
            <Skeleton className="h-6 w-20 rounded-full bg-slate-300" />
          </div>

          {/* Title */}
          <Skeleton className="h-5 w-40 bg-slate-300" />

          {/* Date */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded bg-slate-300" />
            <Skeleton className="h-4 w-32 bg-slate-300" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-lg bg-slate-300" />
          <Skeleton className="h-10 w-24 rounded-lg bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
