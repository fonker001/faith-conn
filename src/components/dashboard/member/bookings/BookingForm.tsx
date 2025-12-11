interface BookingFormProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function BookingForm({
  title,
  children,
  onSubmit,
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h2>
      {children}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}
