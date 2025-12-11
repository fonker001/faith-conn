import { Booking } from "../types";

const StatusBadge = ({ status }: { status: Booking['status'] }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{booking.requesterName}</h3>
        <StatusBadge status={booking.status} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{booking.purpose}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        <span className="font-medium">Preferred:</span> {new Date(booking.preferredDate).toLocaleString()}
      </p>
      {booking.notes && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span className="font-medium">Notes:</span> {booking.notes}
        </p>
      )}
      <div className="mt-3 flex space-x-2">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Approve</button>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Reject</button>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">View Details</button>
      </div>
    </div>
  );
}