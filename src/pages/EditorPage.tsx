import { useParams } from "react-router-dom";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useRef } from "react";
import { Editor } from "@tiptap/react";

import { useState } from "react";

export default function EditorPage() {
  const editorRef = useRef<Editor| null>(null);
  const { id } = useParams();
  // In a real app, you would use the `id` to fetch the document content from your API.
  // If id is 'new', you'd show a blank editor.

  const [title, setTitle] = useState(
    id === "new" ? "Untitled" : `Editing Document ${id}`,
  );

  const handleSave = () => {
    // TODO: Connect to API to save title
    console.log("Saving title:", title);
    if(editorRef.current) {
      const content = editorRef.current.getJSON();
      console.log("Saving content:", content);
      // Here you would typically send the content to your API
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 p-8">
      <div className="mb-4 flex items-center gap-6">
        <input
          className="rounded border-2 border-black bg-transparent px-3 text-2xl text-gray-800 outline-none focus:border-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Document title"
        />
        <button
          onClick={handleSave}
          className="ml-2 rounded border border-indigo-600 bg-indigo-600 px-4 py-1 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          Save
        </button>
      </div>
      <div className="flex-grow overflow-y-auto rounded border bg-white">
        <SimpleEditor onEditorReady={editor=>editorRef.current = editor} />
      </div>
    </div>
  );
}
