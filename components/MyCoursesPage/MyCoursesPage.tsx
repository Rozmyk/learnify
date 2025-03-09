import { CourseProps } from '@/types/api'
import CourseCard from '../ui/CourseCard/CourseCard'
import SinglePurchasedCourse from '../SinglePurchasedCourse/SinglePurchasedCourse'

const MyCoursesPage = ({ courses }: { courses: CourseProps[] | null }) => {
	console.log(courses)
	return (
		<div className='grid  grid-cols-1 md:grid-cols-4 gap-4'>
			{courses &&
				courses.length > 0 &&
				courses.map(item => {
					return <SinglePurchasedCourse {...item} key={item.id} />
				})}
		</div>
	)
}

export default MyCoursesPage
