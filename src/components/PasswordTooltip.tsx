export default function PasswordTooltip() {
  return (
    <span className="ml-1 inline-block">
      <div className="group relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 cursor-help text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="absolute top-0 left-6 z-10 hidden w-64 rounded-md bg-gray-800 p-2 text-xs text-white group-hover:block">
          <p className="mb-1 font-medium">Password must:</p>
          <ul className="list-disc space-y-0.5 pl-4">
            <li>Be at least 8 characters long</li>
            <li>Contain at least one uppercase letter</li>
            <li>Contain at least one lowercase letter</li>
            <li>Contain at least one number</li>
            <li>Contain at least one special character</li>
            <li>Not contain spaces</li>
          </ul>
        </div>
      </div>
    </span>
  );
}
