'use client'
import { CourseProps } from '@/types/api'
import { useState, useEffect } from 'react'
import Loader from '@/components/ui/loader'
import formatTimestamp from '@/lib/formatTimestamp'
import CourseStats from './CourseStats/CourseStats'
const CourseDetails = ({ courseSlug }: { courseSlug: string }) => {
	const [courseData, setCourseData] = useState<CourseProps | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch(`/api/course/${courseSlug}`)

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
		if (courseSlug) {
			fetchCourseData()
		}
	}, [courseSlug])

	if (loading) {
		return (
			<div className='w-full  flex justify-center items-center py-8 '>
				<Loader />
			</div>
		)
	}
	return (
		<div className='p-4'>
			<h1 className='text-2xl font-semibold mb-4'>{courseData?.title}</h1>
			{courseData && <CourseStats courseData={courseData} />}
		</div>
	)
}

export default CourseDetails
