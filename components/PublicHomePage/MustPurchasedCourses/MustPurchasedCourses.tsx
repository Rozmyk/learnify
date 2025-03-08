'use client'
import CoursesCarousel from '@/components/CoursesCarousel/CoursesCarousel'
import { useState, useEffect } from 'react'
import { CourseProps } from '@/types/api'

const MostPurchasedCourses = () => {
	const [courses, setCourses] = useState<CourseProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch('/api/course/popular')
				if (!response.ok) {
					throw new Error('Failed to fetch promoted course')
				}
				const data = await response.json()
				console.log(data)
				setCourses(data)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		fetchCourses()
	}, [])
	return courses && <CoursesCarousel text='Most frequently purchased courses' courses={courses} loading={loading} />
}

export default MostPurchasedCourses
