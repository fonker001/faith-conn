import { Resource } from "../types";

export default function ResourcesGrid({ resources }: { resources: Resource[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {resources.map((resource) => (
        <div 
          key={resource.id} 
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-sm transition"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">{resource.title}</h4>
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
              {resource.type}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {resource.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex space-x-2">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View</button>
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Download</button>
          </div>
        </div>
      ))}
    </div>
  );
}