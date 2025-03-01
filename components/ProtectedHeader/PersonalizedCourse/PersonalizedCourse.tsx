import { CourseProps } from '@/types/api'
import { fetchSingleCourse } from '@/lib/fetchSIngleCourse'
import { fetchCoursesByCategory } from '@/lib/fetchCoursesByCategory'
import CoursesCarousel from '@/components/CoursesCarousel/CoursesCarousel'

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
				<CoursesCarousel
					courses={similarCourses}
					text={
						<p className='mb-2 text-2xl font-medium'>
							Because you watched <span className='font-bold'>{lastCourseData.title}</span>
						</p>
					}
				/>
			</div>
		)
	)
}
