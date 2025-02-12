import CaourseCard from '@/components/ui/CourseCard'
import { CourseProps } from '@/types/api'
const RecommendedCourses = ({ courses }: { courses: CourseProps[] }) => {
	return (
		<div>
			<h2 className='text-4xl mb-5'>What will you learn now?</h2>
			<p className='mb-10 text-2xl'>Recommended for you</p>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
				{courses && courses.map(course => <CaourseCard key={course.id} {...course} />)}
			</div>
		</div>
	)
}

export default RecommendedCourses
