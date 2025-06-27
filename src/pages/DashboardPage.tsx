import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function DashboardPage() {
  return (
    <div className='h-screen p-8'>
        <h1>My Document</h1>

        <SimpleEditor />
    </div>
  )
}
