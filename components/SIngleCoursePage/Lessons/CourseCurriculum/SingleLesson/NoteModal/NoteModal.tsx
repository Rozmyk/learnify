import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
const NoteModal = ({ content }: { content: object | undefined }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		editable: false,
		content,
	})
	return (
		<div className='prose max-w-none'>
			<EditorContent editor={editor} />
		</div>
	)
}

export default NoteModal
