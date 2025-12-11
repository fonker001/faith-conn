import AnnouncementsSection from "@/components/dashboard/catechist/announcements/AnnouncementsSection";
import BookingsSection from "@/components/dashboard/catechist/bookings/BookingsSection";
import Header from "@/components/dashboard/catechist/layout/Header";
import StatsOverview from "@/components/dashboard/catechist/layout/StatsOverview";
import { mockPrograms, mockResources, mockStudents } from "@/components/dashboard/catechist/mockData";
import ProgramsSection from "@/components/dashboard/catechist/programs/ProgramsSection";
import ResourcesGrid from "@/components/dashboard/catechist/resources/ResourcesGrid";
import StudentsTable from "@/components/dashboard/catechist/students/StudentsTable";
import QuickActions from "@/components/dashboard/catechist/ui/QuickActions";

// // Mock data (replace with real API calls)
// const mockPrograms: CatechismProgram[] = [/* ... */];
// const mockStudents: Student[] = [/* ... */];
// const mockResources: Resource[] = [/* ... */];

export default function CatechistDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StatsOverview 
          programsCount={mockPrograms.length}
          studentsCount={mockStudents.length}
          readyCount={mockStudents.filter(s => s.status === 'Ready').length}
          missingDocsCount={mockStudents.filter(s => s.missingDocuments.length > 0).length}
        />
        
        <QuickActions />
        
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Programs</h2>
          <ProgramsSection programs={mockPrograms} />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Student Roster</h2>
          <StudentsTable students={mockStudents} />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Teaching Resources</h2>
          <ResourcesGrid resources={mockResources} />
        </section>

        <AnnouncementsSection />
        <BookingsSection />
      </main>
    </div>
  );
}