import { CourseProps } from '@/types/api'

const SinglePurchasedCourse = ({ title, profiles }: CourseProps) => {
	return (
		<div className='w-80 max-w-80 mix-w-80  p-2'>
			<h3 className='line-clamp-2 font-semibold'>{title}</h3>
			<p className='capitalize text-muted-foreground text-sm'>{profiles.username}</p>
		</div>
	)
}

export default SinglePurchasedCourse
