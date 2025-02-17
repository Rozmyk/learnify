import { CourseProps } from '@/types/api'
import CoursesCarousel from '@/components/CoursesCarousel/CoursesCarousel'
const RecommendedCourses = ({ courses }: { courses: CourseProps[] }) => {
	return (
		<div>
			<h2 className='text-4xl mb-5'>What will you learn now?</h2>

			<CoursesCarousel text='Recommended for you' courses={courses} />
		</div>
	)
}

export default RecommendedCourses
