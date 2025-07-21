import { useRef, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function UserProfile({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  async function onLogout() {
    console.log("Logging out...");
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Include cookies for session management
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // Optionally, redirect to login page or show a success message
      window.location.href = "/login"; // Redirect to login page
    } else {
      console.error("Logout failed:", response.statusText);
      // Handle error, e.g., show an error message
    }
  }
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="focus:outline-none"
        title={username}
      >
        <span className="inline-block size-11 cursor-pointer overflow-hidden rounded-full bg-indigo-500 hover:bg-indigo-700">
          <svg
            className="size-full text-gray-300"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.62854"
              y="0.359985"
              width="15"
              height="15"
              rx="7.5"
              fill="white"
            ></rect>
            <path
              d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
              fill="currentColor"
            ></path>
            <path
              d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </button>
      {open && (
        <div className="animate-fade-in absolute right-0 z-1000 mt-2 w-48 rounded-md border border-black bg-white py-2 shadow-lg">
          <div className="cursor-pointer border-b border-black px-4 py-2 text-center font-medium text-gray-700 hover:bg-blue-100">
            {username}
          </div>
          <button
            className="w-full cursor-pointer px-4 py-2 text-center  text-red-600 hover:bg-blue-100 focus:outline-none"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
