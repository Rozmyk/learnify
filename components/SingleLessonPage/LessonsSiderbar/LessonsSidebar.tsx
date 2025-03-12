'use client'

import { SingleSectionProps } from '@/types/api'
import Loader from '@/components/ui/loader'
import { useState, useEffect } from 'react'

const LessonsSidebar = ({ lessonId }: { lessonId: string | null }) => {
	const [loading, setLoading] = useState(true)
	const [sections, setSections] = useState<SingleSectionProps[] | null>(null)

	useEffect(() => {
		if (!lessonId) return

		const fetchSections = async () => {
			try {
				const response = await fetch(`/api/get-lessons?lessonId=${lessonId}`)

				if (!response.ok) {
					throw new Error('Failed to fetch lessons')
				}

				const data = await response.json()
				setSections(data.sections)
				console.log(data)
				setLoading(false)
			} catch (err) {
				console.error(err)
			}
		}

		fetchSections()
	}, [lessonId])

	if (loading) {
		return (
			<div className='w-full flex justify-center items-center '>
				<Loader />
			</div>
		)
	}

	return (
		<div className='p-4'>
			<ul className='list-disc ml-6'>{sections?.map(lesson => <li key={lesson.id}>{lesson.title}</li>)}</ul>
		</div>
	)
}

export default LessonsSidebar
