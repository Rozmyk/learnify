'use client'
import { CourseProps } from '@/types/api'
import { useState, useEffect } from 'react'
import Loader from '@/components/ui/loader'
const CourseDetails = ({ courseId }: { courseId: string }) => {
	const [courseData, setCourseData] = useState<CourseProps | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch(`/api/course/id?id=${courseId}`)

				if (!response.ok) {
					throw new Error('Failed to fetch course')
				}
				const data = await response.json()
				setCourseData(data)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		if (courseId) {
			fetchCourseData()
		}
	}, [courseId])

	if (loading) {
		return (
			<div className='w-full  flex justify-center items-center py-8 h-screen'>
				<Loader />
			</div>
		)
	}
	return <div className='h-screen'>course details :{courseId}</div>
}

export default CourseDetails
