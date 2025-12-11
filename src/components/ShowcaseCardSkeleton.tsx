import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ShowcaseCardSkeleton() {
  return (
    <Card className="bg-white border-2 border-[#D4AF37] rounded-xl p-6 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-start space-x-4">
        {/* Icon circle */}
        <div className="p-3 rounded-lg bg-[#D4AF37]/10">
          <Skeleton className="w-8 h-8 rounded-md bg-slate-300" />
        </div>

        {/* Title + Subtitle */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40 bg-slate-300" /> {/* Title */}
          <Skeleton className="h-4 w-28 bg-slate-300" /> {/* Subtitle */}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-slate-300" />
        <Skeleton className="h-4 w-[90%] bg-slate-300" />
        <Skeleton className="h-4 w-[70%] bg-slate-300" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        <Skeleton className="h-6 w-16 rounded-full bg-slate-300" />
        <Skeleton className="h-6 w-16 rounded-full bg-slate-300" />
        <Skeleton className="h-6 w-20 rounded-full bg-slate-300" />
      </div>

      {/* Metadata */}
      <div className="pt-4 border-t border-[#D4AF37]/20 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded bg-slate-300" />
          <Skeleton className="h-4 w-32 bg-slate-300" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded bg-slate-300" />
          <Skeleton className="h-4 w-32 bg-slate-300" />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[#D4AF37]">
        <Skeleton className="h-4 w-28 bg-slate-300" />
      </div>

      {/* Action Button */}
      <Skeleton className="h-10 w-full rounded-lg bg-slate-300" />
    </Card>
  );
}
