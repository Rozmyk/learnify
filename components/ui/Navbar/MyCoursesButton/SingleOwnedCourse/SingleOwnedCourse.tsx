import { CourseProps } from '@/types/api'
import Image from 'next/image'
const SingleOwnedCourse = ({ thumbnail, title }: CourseProps) => {
	return (
		<div className='flex gap-4 p-2 items-start justify-between'>
			<div className='w-16 h-16 min-w-16 min-h-16 relative rounded-lg overflow-hidden'>
				<Image src={thumbnail} className='object-cover' alt='course photo' fill />
			</div>
			<p className='font-semibold'>{title}</p>
		</div>
	)
}

export default SingleOwnedCourse
