import { useParams } from "react-router-dom";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

import { useState } from "react";

export default function EditorPage() {
  const { id } = useParams();
  // In a real app, you would use the `id` to fetch the document content from your API.
  // If id is 'new', you'd show a blank editor.

  const [title, setTitle] = useState(
    id === "new" ? "Untitled" : `Editing Document ${id}`,
  );

  const handleSave = () => {
    // TODO: Connect to API to save title
    console.log("Saving title:", title);
    
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 p-8">
      <div className="mb-4 flex items-center">
        <input
          className="h-8 w-48 rounded border-2 border-black bg-transparent px-3 py-2 text-2xl font-bold text-gray-800 outline-none focus:border-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Document title"
        />
        <button
          onClick={handleSave}
          className="ml-2 h-8 rounded border border-indigo-600 bg-indigo-600 px-4 py-1 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          Save
        </button>
      </div>
      <div className="flex-grow overflow-y-auto rounded border bg-white">
        <SimpleEditor />
      </div>
    </div>
  );
}
