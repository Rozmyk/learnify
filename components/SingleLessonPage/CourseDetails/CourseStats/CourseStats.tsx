import { addRatingsToCourses } from '@/lib/calcRatings'
import { CourseProps } from '@/types/api'
import { ReactNode } from 'react'
import StarRating from '@/components/ui/starRating'
import formatTimestamp from '@/lib/formatTimestamp'
import StatItem from '@/components/StatItem/StatItem'
import { Globe, CircleAlert } from 'lucide-react'
const SingleStat = ({ children, text }: { children: ReactNode; text: string }) => {
	return (
		<div className='flex flex-col justify-center items-start'>
			{children}
			<p className='text-xs text-muted-foreground'>{text}</p>
		</div>
	)
}

const CourseStats = ({ courseData }: { courseData: CourseProps }) => {
	const ratingData = addRatingsToCourses(courseData.reviews)

	return (
		<div className='flex flex-col  p-4'>
			<div className='flex justify-start items-center gap-6 mb-4'>
				<SingleStat text={`${ratingData.reviewCount} reviews`}>
					<StarRating reviews={courseData.reviews} compact />
				</SingleStat>
				<SingleStat text='Course participants'>
					<p className='font-semibold text-sm'>12 345</p>
				</SingleStat>
				<SingleStat text='Total'>
					<p className='font-semibold text-sm'>10 h</p>
				</SingleStat>
			</div>
			<div className='flex flex-col gap-2'>
				<StatItem value={`Last update: ${formatTimestamp(courseData.created_at)}`} icon={CircleAlert} />
				<StatItem value={`Language: ${courseData.language}`} icon={Globe} />
			</div>
		</div>
	)
}

export default CourseStats
