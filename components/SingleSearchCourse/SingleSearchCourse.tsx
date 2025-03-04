import { CourseProps } from '@/types/api'
import Image from 'next/image'
import Link from 'next/link'

const SingleSearchCourse = ({ course }: { course: CourseProps }) => {
	return (
		<Link href={`/course/${course.slug}`} className='flex justify-start items-start gap-4 mb-4'>
			<div className='w-10 h-10 relative'>
				<Image src={course.thumbnail} alt='course image' className='object-cover' fill />
			</div>
			<div className='flex flex-col'>
				<h3 className='font-semibold '>{course.title}</h3>
				<div className='flex justify-start items-center gap-2 '>
					<p className='font-semibold text-sm text-muted-foreground'>Course:</p>
					<p className='text-sm text-muted-foreground capitalize'>{course.profiles.username}</p>
				</div>
			</div>
		</Link>
	)
}

export default SingleSearchCourse
