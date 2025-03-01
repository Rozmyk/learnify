import { CourseProps } from '@/types/api'
import Image from 'next/image'
import * as Progress from '@radix-ui/react-progress'

const SingleOwnedCourse = ({ thumbnail, title }: CourseProps) => {
	return (
		<div className='flex gap-4 p-2 items-start justify-between'>
			<div className='w-16 h-16 min-w-16 min-h-16 relative rounded-lg overflow-hidden'>
				<Image src={thumbnail} className='object-cover' alt='course photo' fill />
			</div>
			<div className='flex-1'>
				<p className='font-semibold text-sm mb-2'>{title}</p>
				<Progress.Root className='relative overflow-hidden bg-gray-200 rounded-full w-full h-2'>
					<Progress.Indicator className='bg-blue-500 h-full transition-all duration-300' style={{ width: `${50}%` }} />
				</Progress.Root>
			</div>
		</div>
	)
}

export default SingleOwnedCourse
