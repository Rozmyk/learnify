import { CourseProps } from '@/types/api'
import CourseCard from '@/components/ui/CourseCard'
import { fetchSingleCourse } from '@/lib/fetchSIngleCourse'
import { fetchCoursesByCategory } from '@/lib/fetchCoursesByCategory'

interface PersonalizedCourseProps {
	lastViewedCourseId: string | null
}

export default async function PersonalizedCourse({ lastViewedCourseId }: PersonalizedCourseProps) {
	if (!lastViewedCourseId) {
		return null
	}

	const lastCourseData = await fetchSingleCourse(lastViewedCourseId)
	let similarCourses
	if (lastCourseData) {
		similarCourses = await fetchCoursesByCategory(lastCourseData.categories_id)
		similarCourses = similarCourses.filter((course: CourseProps) => course.id !== lastCourseData.id)
	}

	return (
		similarCourses &&
		similarCourses.length > 0 &&
		lastCourseData && (
			<div>
				<p className='mb-10 text-2xl'>
					Because you watched <span className='font-bold'>{lastCourseData.title}</span>
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					{similarCourses.map((course: CourseProps) => (
						<CourseCard key={course.id} {...course} />
					))}
				</div>
			</div>
		)
	)
}
