import { CourseProps } from '@/types/api'
import MiniCourseCard from './MiniCourseCard/MiniCourseCard'
const AlsoBought = ({ course }: { course: CourseProps }) => {
	return (
		<div className='w-full'>
			<h3 className='text-2xl font-semibold mb-8'>Course participants also bought</h3>
			<div className='flex flex-col gap-4'>
				<MiniCourseCard {...course} />
				<MiniCourseCard {...course} />
			</div>
		</div>
	)
}

export default AlsoBought
