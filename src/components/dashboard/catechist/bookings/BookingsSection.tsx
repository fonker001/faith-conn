import { mockBookings } from '../mockData';
import BookingCard from './BookingCard';

export default function BookingsSection() {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Catechist Bookings</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Manage requests from parishioners seeking catechetical support.
      </p>
      <div className="space-y-4">
        {mockBookings.length > 0 ? (
          mockBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No booking requests.</p>
        )}
      </div>
    </section>
  );
}