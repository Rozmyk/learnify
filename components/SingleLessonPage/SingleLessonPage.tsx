'use client'
import { SingleLessonProps } from '@/types/api'
import Loader from '../ui/loader'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Skeleton from '../ui/skeleton'
const SingleLessonPage = ({ lessonId }: { lessonId: string | null }) => {
	const [lessonData, setLessonData] = useState<SingleLessonProps | null>(null)
	const [loading, setLoading] = useState(true)
	const editor = useEditor({
		extensions: [StarterKit],
		editable: false,
		content: lessonData?.content_json,
	})
	useEffect(() => {
		if (!lessonId) return
		const fetchLesson = async () => {
			try {
				const response = await fetch(`/api/get-single-lesson?lessonId=${lessonId}`)
				if (!response.ok) {
					throw new Error('Failed to fetch lesson')
				}
				const data = await response.json()
				setLessonData(data.lesson)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		if (lessonId) {
			fetchLesson()
		}
	}, [lessonId])
	if (loading) {
		return (
			<div className='w-full h-full flex justify-center items-center py-8'>
				<Skeleton className='w-full h-[70vh] ' />
			</div>
		)
	}
	return (
		lessonData && (
			<div className='flex justify-center items-centerw w-full h-full'>
				{lessonData.video_url ? (
					<ReactPlayer url={lessonData.video_url} playing={true} controls={true} width='100%' height='70vh' />
				) : (
					<div className='prose max-w-none w-full h-[70vh]'>
						<EditorContent editor={editor} />
					</div>
				)}
			</div>
		)
	)
}

export default SingleLessonPage
