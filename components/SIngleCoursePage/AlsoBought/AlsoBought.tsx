import { useState, useEffect } from 'react'
import { CourseProps } from '@/types/api'
import MiniCourseCard from './MiniCourseCard/MiniCourseCard'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Loader from '@/components/ui/loader'
const AlsoBought = ({ courseId }: { courseId: string }) => {
	const [otherCourses, setOtherCourses] = useState<null | CourseProps[]>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const res = await fetch(`/api/also-bought?courseId=${courseId}`)
				const data = await res.json()

				const courses = data.courses
				setOtherCourses(courses)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		if (courseId) {
			fetchCourse()
		}
	}, [courseId])
	return loading ? (
		<div className='flex justify-center items-center w-full py-8'>
			<Loader />
		</div>
	) : (
		<div className='w-full'>
			{otherCourses && otherCourses.length > 0 && (
				<>
					{' '}
					<SectionTitle>Course participants also bought</SectionTitle>
					<div className='flex flex-col gap-4'>
						{otherCourses?.map(item => {
							return <MiniCourseCard key={item.id} {...item} />
						})}
					</div>
				</>
			)}
		</div>
	)
}

export default AlsoBought
