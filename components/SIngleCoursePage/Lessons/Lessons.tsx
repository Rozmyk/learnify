import SectionTitle from '@/components/SectionTitle/SectionTitle'
import { useState, useEffect } from 'react'
import Loader from '@/components/ui/loader'
import { SingleSectionProps } from '@/types/api'
import CourseCurriculum from './CourseCurriculum/CourseCurriculum'
const Lessons = ({ course_id }: { course_id: string }) => {
	const [loading, setLoading] = useState(true)
	const [sections, setSections] = useState<SingleSectionProps[] | null>(null)
	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				const response = await fetch(`/api/section?course_id=${course_id}`)

				if (!response.ok) {
					throw new Error('Failed to fetch user stats')
				}

				const data = await response.json()
				console.log(data)
				setSections(data)
			} catch (err: any) {
				console.log(err.message)
			} finally {
				setLoading(false)
			}
		}

		if (course_id) {
			fetchUserStats()
		}
	}, [course_id])
	return (
		<div className='w-full'>
			<SectionTitle>Course content</SectionTitle>
			{loading ? (
				<div className='flex justify-center items-center w-full py-8'>
					<Loader />
				</div>
			) : (
				sections && <CourseCurriculum sections={sections} />
			)}
		</div>
	)
}

export default Lessons
