'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Bold as BoldIcon, Italic as ItalicIcon, LucideIcon, GripVertical } from 'lucide-react'
const IconButton = ({ onClick, Icon }: { onClick: () => void; Icon: LucideIcon }) => {
	return (
		<Button onClick={onClick} size='icon' variant='ghost'>
			<Icon size={16} />
		</Button>
	)
}

export default function RichTextEditor({ description }: { description: string }) {
	const [jsonContent, setJsonContent] = useState(null)

	const editor = useEditor({
		extensions: [StarterKit, Bold, Italic, BulletList, ListItem],
		content: '<p className="text-muted-foreground">Wstaw opis swojego kursu.</p>',
		// onUpdate: ({ editor }) => {
		// 	setJsonContent(editor.getJSON())
		// },
	})

	return (
		<div className='   w-full max-w-2xl'>
			<Label className='font-semibold my-1 text-base'>Course description</Label>

			<div className='border p-1 rounded mt-2 bg-background'>
				<div className='flex gap-2 border-b pb-2'>
					<IconButton onClick={() => editor?.chain().focus().toggleBold().run()} Icon={BoldIcon} />
					<IconButton onClick={() => editor?.chain().focus().toggleItalic().run()} Icon={ItalicIcon} />
					<IconButton onClick={() => editor?.chain().focus().toggleBulletList().run()} Icon={GripVertical} />
				</div>
				<EditorContent editor={editor} className='p-2' />
			</div>
			<p className='text-xs text-muted-foreground mt-2'>{description}</p>
		</div>
	)
}
