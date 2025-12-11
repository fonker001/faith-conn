import { mockAnnouncements } from '../mockData';
import AnnouncementCard from './AnnouncementCard';
import NewAnnouncementForm from './NewAnnouncementForm';

export default function AnnouncementsSection() {
  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Announcements</h2>
        <NewAnnouncementForm />
      </div>
      <div className="space-y-4">
        {mockAnnouncements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} />
        ))}
      </div>
    </section>
  );
}