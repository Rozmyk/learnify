'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { Label } from '@/components/ui/label'
import { Bold as BoldIcon, Italic as ItalicIcon, LucideIcon, GripVertical } from 'lucide-react'

const IconButton = ({ onClick, Icon }: { onClick: () => void; Icon: LucideIcon }) => (
	<Button onClick={onClick} size='icon' variant='ghost'>
		<Icon size={16} />
	</Button>
)

export default function RichTextEditor({
	value,
	onChange,
	maxLength,
	title,
	description,
}: {
	value: string
	onChange: (content: string) => void
	maxLength?: number
	title: string
	description?: string
}) {
	const editor = useEditor({
		extensions: [StarterKit, Bold, Italic, BulletList, ListItem],
		content: `<p>${value}</p>`,
		editorProps: {
			attributes: {
				class: 'text-sm',
			},
		},
		onUpdate: ({ editor }) => {
			const text = editor.getText()
			if (maxLength && text.length > maxLength) {
				editor.commands.setContent(text.slice(0, maxLength))
			} else {
				onChange(editor.getHTML())
			}
		},
	})

	useEffect(() => {
		if (editor && editor.getHTML() !== value) {
			editor.commands.setContent(value)
		}
	}, [value, editor])

	if (!editor) return null

	return (
		<div className='w-full mb-10'>
			<Label className='font-semibold my-1 text-base'>{title}</Label>
			<div className='border p-1 rounded mt-2 bg-background'>
				<div className='flex gap-2 justify-between items-center border-b pb-2 px-2'>
					<div>
						<IconButton onClick={() => editor.chain().focus().toggleBold().run()} Icon={BoldIcon} />
						<IconButton onClick={() => editor.chain().focus().toggleItalic().run()} Icon={ItalicIcon} />
						<IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} Icon={GripVertical} />
					</div>
					{maxLength && <p className='text-muted-foreground'>{maxLength - editor.getText().length}</p>}
				</div>
				<EditorContent editor={editor} className='p-2' />
			</div>
			{description && <p className='text-xs text-muted-foreground mt-2'>{description}</p>}
		</div>
	)
}
