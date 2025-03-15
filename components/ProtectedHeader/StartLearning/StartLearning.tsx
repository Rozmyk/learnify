'use client'
import { UserLessonsProgressProps } from '@/types/api'
import SingleLessonCard from './SingleLessonCard/SingleLessonCard'
import { useState, useEffect } from 'react'
import Skeleton from '@/components/ui/skeleton'
const StartLearning = () => {
	const [lessons, setLessons] = useState<UserLessonsProgressProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchLessons = async () => {
			try {
				const response = await fetch(`/api/user-lessons-progress`)

				if (!response.ok) {
					throw new Error('Failed to fetch lessons')
				}

				const data = await response.json()

				setLessons(data)
				setLoading(false)
			} catch (err) {
				console.error(err)
			}
		}

		fetchLessons()
	}, [])
	return loading ? (
		<div>
			<Skeleton className='w-72 h-8 mb-5' />
			<div className='flex justify-between items-center'>
				<Skeleton className='w-96 h-40' /> <Skeleton className='w-96 h-40' /> <Skeleton className='w-96 h-40' />
			</div>
		</div>
	) : (
		<div>
			<h2 className='text-3xl font-semibold mb-5'>Let's start learning</h2>

			<div className='flex justify-start items-center gap-4'>
				{lessons?.map(lesson => {
					return <SingleLessonCard key={lesson.id} {...lesson} />
				})}
			</div>
		</div>
	)
}

export default StartLearning
