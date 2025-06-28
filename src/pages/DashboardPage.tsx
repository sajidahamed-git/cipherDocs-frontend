import { Link} from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

import { useAuth } from "../context/AuthContext";

// In a real app, you would fetch this data from your API
const documents = [
  { id: "1", title: "My First Note", lastModified: "2 hours ago" },
  { id: "2", title: "Project Ideas", lastModified: "Yesterday" },
  { id: "3", title: "Meeting Minutes", lastModified: "3 days ago" },
  { id: "4", title: "My First Note", lastModified: "2 hours ago" },
  { id: "5", title: "Project Ideas", lastModified: "Yesterday" },
  { id: "6", title: "Meeting Minutes", lastModified: "3 days ago" },
  { id: "7", title: "My First Note", lastModified: "2 hours ago" },
  { id: "8", title: "Project Ideas", lastModified: "Yesterday" },
  { id: "9", title: "Meeting Minutes", lastModified: "3 days ago" },
  { id: "10", title: "My First Note", lastModified: "2 hours ago" },
  { id: "11", title: "Project Ideas", lastModified: "Yesterday" },
  { id: "12", title: "Meeting Minutes", lastModified: "3 days ago" },
  { id: "13", title: "My First Note", lastModified: "2 hours ago" },
  { id: "14", title: "Project Ideas", lastModified: "Yesterday" },
  { id: "15", title: "Meeting Minutes", lastModified: "3 days ago" },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!user) {
    return <div className="h-screen flex items-center justify-center">You must be logged in to view this page.</div>;
  }
  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="container mx-auto p-4 sm:px-6 lg:px-8 max-w-7xl my-8 sm:my-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>
          <Link
            to="/dashboard/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            New Document
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              to={`/document/${doc.id}`}
              className="flex transform flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4 h-12 w-12 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h5 className="mb-2 w-full truncate text-xl font-bold tracking-tight text-gray-900">
                {doc.title}
              </h5>
              <p className="text-sm font-normal text-gray-500">
                {doc.lastModified}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
