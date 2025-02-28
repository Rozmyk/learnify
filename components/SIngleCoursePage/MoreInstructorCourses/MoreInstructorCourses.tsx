import { useState, useEffect } from 'react'
import CourseCard from '@/components/ui/CourseCard'
import { CourseProps } from '@/types/api'

const MoreInstructorCourses = ({ author_id }: { author_id: string }) => {
	console.log(author_id)
	const [instructorCourses, setIncstructorCourses] = useState<CourseProps[] | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch(`/api/course/author_id/author_id=${author_id}`)
				const text = await response.text()
				console.log('Raw response:', text)
				console.log(response)
				if (!response.ok) {
					console.error('Response error:', response.status, text)
					return
				}

				const data = JSON.parse(text)
				console.log(data)
				setIncstructorCourses(data.courses)
			} catch (error) {
				console.error('Error:', error)
			} finally {
				setLoading(false)
			}
		}

		if (author_id) {
			fetchCourses()
		}
	}, [author_id])
	return (
		<div>
			<h3>More instructor courses</h3>
			{instructorCourses &&
				instructorCourses.map(course => {
					return <CourseCard key={course.id} {...course} />
				})}
		</div>
	)
}

export default MoreInstructorCourses
