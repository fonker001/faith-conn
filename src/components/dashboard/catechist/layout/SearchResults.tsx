import { SearchResult } from "../types";

const getTypeLabel = (type: SearchResult["type"]) => {
  switch (type) {
    case "program":
      return "Program";
    case "student":
      return "Student";
    case "resource":
      return "Resource";
    default:
      return "Item";
  }
};

const getTypeColor = (type: SearchResult["type"]) => {
  switch (type) {
    case "program":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    case "student":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    case "resource":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

export default function SearchResults({
  results,
  onNavigate,
}: {
  results: SearchResult[];
  onNavigate: () => void;
}) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {results.map((result, index) => (
        <button
          key={`${result.type}-${result.data.id || index}`}
          onClick={onNavigate}
          className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-750"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                {result.type === "program" && result.data.name}
                {result.type === "student" && result.data.name}
                {result.type === "resource" && result.data.title}
              </h4>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {result.type === "student" &&
                  `Parent(s): ${result.data.parentNames.join(", ")}`}
                {result.type === "program" && `Type: ${result.data.type}`}
                {result.type === "resource" && `Type: ${result.data.type}`}
              </p>
            </div>

            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(
                result.type
              )}`}
            >
              {getTypeLabel(result.type)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
