import { useState, useEffect } from 'react'
import CourseCard from '@/components/ui/CourseCard/CourseCard'
import { CourseProps } from '@/types/api'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle/SectionTitle'

const MoreInstructorCourses = ({ author_id, authorUsername }: { author_id: string; authorUsername: string }) => {
	const [instructorCourses, setIncstructorCourses] = useState<CourseProps[] | null>(null)

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch(`/api/course/author_id?author_id=${author_id}&limit=3`)

				if (!response.ok) {
					console.error('Response error:', response.status)
					return
				}

				const data = await response.json()
				setIncstructorCourses(data.courses)
			} catch (error) {
				console.error('Error:', error)
			}
		}

		if (author_id) {
			fetchCourses()
		}
	}, [author_id])

	return (
		instructorCourses &&
		instructorCourses.length > 0 && (
			<div>
				<SectionTitle>
					More courses by instructor{' '}
					<Link className='underline' href={`/user/${authorUsername} `}>
						{authorUsername}
					</Link>
				</SectionTitle>
				<div className='grid  grid-cols-1 md:grid-cols-3 gap-4 w-full'>
					{instructorCourses?.map(course => {
						return <CourseCard key={course.id} {...course} />
					})}
				</div>
			</div>
		)
	)
}

export default MoreInstructorCourses
