import { useParams } from "react-router-dom";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Editor } from "@tiptap/react";
import { useAuth } from "@/context/AuthContext";
import Home from "@/components/Home";
import UserProfile from "@/components/UserProfile";

import { useEffect,useState,useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditorPage() {
  const { user } = useAuth();
  const editorRef = useRef<Editor | null>(null);
  const { id } = useParams();

  const [title, setTitle] = useState(
    id === "new" ? "Untitled Document" : `${id}`,
  );

  const [saving, setSaving] = useState(false)


  const handleSave =  async () => {
    setSaving(true);
    // TODO: Connect to API to save title
    console.log("Saving title:", title);
    if (editorRef.current) {
      const content = editorRef.current.getJSON();
      console.log("Saving content:", content);

      const response = await fetch(`${API_URL}/document/${id}`, {
        method: "POST",
        credentials: "include", // Include cookies for session management
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (response.ok) {
        // const data = await response.json();
        setSaving(false);
        console.log("Document saved successfully:");
      }
      else {
        const errorData = await response.json();
        console.error("Error saving document:", errorData);
      }

    }
  };

  //fetch the document content if id is not 'new'
  useEffect(() => {
    if (id && id !== "new") {
      fetch(`${API_URL}/document/${id}`, {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for session/cookie auth
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch document");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched document data:", data);
          if (editorRef.current) {
            editorRef.current.commands.setContent(data.content);
            setTitle(data.title);
          }
        })
        .catch((error) => {
          console.error("Error fetching document:", error);
        });
    }
  }, [id]);

if (!user) {
  return <div>Loading...</div>;
}

  return (
    <div className="flex h-screen flex-col bg-gray-50 px-8">

      <div className=" flex pt-2 items-center justify-between gap-6">
        <div className="left flex gap-4 items-center">
          <Home></Home>
          <input
            className="rounded border-2 border-black bg-transparent px-3 text-2xl text-gray-800 outline-none focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Document title"
          />
          <button
            onClick={handleSave}
            className=" rounded border border-indigo-600 bg-indigo-600 px-4 py-1 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
        <UserProfile username={user.username} />
      </div>
      <div className="editor mt-12 flex-grow overflow-y-auto rounded border bg-white">
        <SimpleEditor
          onEditorReady={(editor) => (editorRef.current = editor)}
        />
      </div>
    </div>
  );
}
