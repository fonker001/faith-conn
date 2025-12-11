import { GraduationCap, LibraryBig, TriangleAlert, Trophy } from "lucide-react";
import StatCard from "../ui/StatCard";

export default function StatsOverview({
  programsCount,
  studentsCount,
  readyCount,
  missingDocsCount,
}: {
  programsCount: number;
  studentsCount: number;
  readyCount: number;
  missingDocsCount: number;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Active Programs"
        value={programsCount}
        icon={LibraryBig}
      />
      <StatCard title="Students" value={studentsCount} icon={GraduationCap} />
      <StatCard title="Ready for Sacrament" value={readyCount} icon={Trophy} />
      <StatCard
        title="Missing Docs"
        value={missingDocsCount}
        icon={TriangleAlert}
      />
    </div>
  );
}
