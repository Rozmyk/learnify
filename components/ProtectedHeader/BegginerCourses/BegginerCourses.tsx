'use client'
import { useState, useEffect } from 'react'
import CoursesCarousel from '@/components/CoursesCarousel/CoursesCarousel'
import { CourseProps } from '@/types/api'
const BegginerCourses = () => {
	const [courses, setCourses] = useState<CourseProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	const level = 'begginer'
	useEffect(() => {
		const fetchFilteredCourses = async () => {
			setLoading(true)

			const params = new URLSearchParams({
				instructional_level: level,
			})

			const response = await fetch(`/api/courses?${params}`)
			const data = await response.json()

			setCourses(data)
			setLoading(false)
		}

		fetchFilteredCourses()
	}, [])

	return (
		<div className='w-full'>
			{courses && courses.length > 0 && (
				<CoursesCarousel
					text={
						<p className='mb-2 text-2xl font-medium'>
							Courses for <span className='font-bold capitalize'>{level}</span>
						</p>
					}
					loading={loading}
					courses={courses}
				/>
			)}
		</div>
	)
}

export default BegginerCourses
