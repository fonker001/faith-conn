import { Student } from "../types";

export default function StudentsTable({ students }: { students: Student[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Student</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Parents</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Attendance</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800 dark:text-gray-200">{student.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {student.sacramentsReceived.join(', ') || 'None'}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                {student.parentNames.join(', ')}
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  student.attendance >= 80 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {student.attendance}%
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  student.status === 'Ready'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : student.status === 'Incomplete'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                }`}>
                  {student.status}
                </span>
                {student.missingDocuments.length > 0 && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                    ⚠️ {student.missingDocuments[0]}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}