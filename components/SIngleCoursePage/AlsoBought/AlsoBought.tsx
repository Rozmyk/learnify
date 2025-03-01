import { CourseProps } from '@/types/api'
import MiniCourseCard from './MiniCourseCard/MiniCourseCard'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
const AlsoBought = ({ course }: { course: CourseProps }) => {
	return (
		<div className='w-full'>
			<SectionTitle>Course participants also bought</SectionTitle>
			<div className='flex flex-col gap-4'>
				<MiniCourseCard {...course} />
				<MiniCourseCard {...course} />
			</div>
		</div>
	)
}

export default AlsoBought
