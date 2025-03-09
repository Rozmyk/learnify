'use client'
import { useState, useEffect } from 'react'
import CoursesCarousel from '@/components/CoursesCarousel/CoursesCarousel'
import { CourseProps } from '@/types/api'
const BegginerCourses = () => {
	const [courses, setCourses] = useState<CourseProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchFilteredCourses = async () => {
			setLoading(true)
			const level = 'beginner'

			const response = await fetch(`/api/courses?instructional_level=${level}`)
			const data = await response.json()
			console.log(data)
			setCourses(data)
			setLoading(false)
		}
		fetchFilteredCourses()
	}, [])
	return (
		courses &&
		courses.length > 0 && <CoursesCarousel text='Courses for beginners' loading={loading} courses={courses} />
	)
}

export default BegginerCourses
