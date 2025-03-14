'use client'

import { SingleLessonProps, UserLessonsProgressProps } from '@/types/api'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Skeleton from '../ui/skeleton'

const SingleLessonPage = ({ lessonId }: { lessonId: string | null }) => {
	const [lessonData, setLessonData] = useState<SingleLessonProps | null>(null)
	const [progressData, setProgressData] = useState<UserLessonsProgressProps | null>(null)
	const [loading, setLoading] = useState(true)

	const editor = useEditor({
		extensions: [StarterKit],
		editable: false,
		content: '',
	})

	useEffect(() => {
		if (lessonData?.content_json && editor) {
			editor.commands.setContent(lessonData.content_json)
		}
	}, [lessonData?.content_json, editor])

	const handleChangeWatched = async () => {
		if (!progressData?.watched) {
			try {
				const response = await fetch('/api/updateWatched', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ lessonId }),
				})
				const data = await response.json()
				if (!response.ok) {
					console.log(data.error)
				}
			} catch (err) {
				console.log(err)
			}
		}
	}

	useEffect(() => {
		if (!lessonId) return
		const fetchLesson = async () => {
			try {
				const response = await fetch(`/api/get-single-lesson?lessonId=${lessonId}`)
				if (!response.ok) throw new Error('Failed to fetch lesson')
				const data = await response.json()
				setLessonData(data.lesson)
				setProgressData(data.userLessonProgress)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		fetchLesson()
	}, [lessonId])

	if (loading) {
		return (
			<div className='w-full h-full flex justify-center items-center py-8'>
				<Skeleton className='w-full h-[70vh]' />
			</div>
		)
	}

	return (
		lessonData && (
			<div className='flex justify-center items-center w-full h-full'>
				{lessonData.video_url ? (
					<ReactPlayer
						onEnded={handleChangeWatched}
						url={lessonData.video_url}
						playing={true}
						controls={true}
						width='100%'
						height='70vh'
					/>
				) : (
					<div className='prose max-w-none w-full h-[70vh] overflow-y-auto px-4'>
						<EditorContent editor={editor} />
					</div>
				)}
			</div>
		)
	)
}

export default SingleLessonPage
