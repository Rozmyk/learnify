'use client'
import { CourseProps } from '@/types/api'
import { useState, useEffect } from 'react'
import Loader from '@/components/ui/loader'
import CourseStats from './CourseStats/CourseStats'
import DetailsBox from './DetailsBox/DetailsBox'
import Image from 'next/image'
const CourseDetails = ({ courseSlug }: { courseSlug: string }) => {
	const [courseData, setCourseData] = useState<CourseProps | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch(`/api/course/slug?slug=${courseSlug}`)

				if (!response.ok) {
					throw new Error('Failed to fetch course')
				}

				const data = await response.json()
				console.log(data)
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
			<DetailsBox title='Details'>
				<p>Skill level: {courseData?.level}</p>
				<p>Language: {courseData?.language}</p> <p>Subtitles: No</p>
			</DetailsBox>
			<DetailsBox title='Description'>
				<p>{courseData?.detailed_description}</p>
			</DetailsBox>
			{courseData && (
				<DetailsBox title='Instructors'>
					<div className='flex justify-start items-start gap-4'>
						<div className='w-20 h-20 min-h-20 min-w-20 rounded-full overflow-hidden relative'>
							<Image src={courseData?.profiles.avatar_url} fill alt='user photo' />
						</div>
						<div className='flex flex-col justify-start items-start'>
							<h4 className='font-semibold capitalize text-primary'>{courseData.profiles.username}</h4>
							<p>{courseData.profiles.header}</p>
						</div>
					</div>
					<p className='mt-4'>{courseData.profiles.description}</p>
				</DetailsBox>
			)}
		</div>
	)
}

export default CourseDetails
