import { useParams } from 'react-router-dom';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

export default function EditorPage() {
  const { id } = useParams();

  // In a real app, you would use the `id` to fetch the document content from your API.
  // If id is 'new', you'd show a blank editor.

  return (
    <div className="h-screen p-8 flex flex-col bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {id === 'new' ? 'New Document' : `Editing Document ${id}`}
      </h1>
      <div className="flex-grow overflow-y-auto border rounded-lg bg-white shadow-inner">
        <SimpleEditor />
      </div>
    </div>
  );
}
