import { addRatingsToCourses } from '@/lib/calcRatings'
import { CourseProps } from '@/types/api'
import { ReactNode } from 'react'
import StarRating from '@/components/ui/starRating'
import formatTimestamp from '@/lib/formatTimestamp'
import StatItem from '@/components/StatItem/StatItem'
import { Globe, CircleAlert } from 'lucide-react'
import { useState, useEffect } from 'react'

const SingleStat = ({ children, text }: { children: ReactNode; text: string }) => {
	return (
		<div className='flex flex-col justify-center items-start'>
			{children}
			<p className='text-xs text-muted-foreground'>{text}</p>
		</div>
	)
}

const CourseStats = ({ courseData }: { courseData: CourseProps }) => {
	const [totalCourseOwner, setTotalCourseOwner] = useState<null | number>(null)
	const ratingData = addRatingsToCourses(courseData.reviews)

	const calcTotalDuration = () => {
		const totalSeconds = courseData.lessons.reduce((total, lesson) => {
			const [minutes, seconds] = lesson.duration.split(':').map(Number)
			return total + (minutes * 60 + seconds)
		}, 0)

		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)

		return `${hours} h ${minutes} min`
	}
	const calcCourseOwner = async () => {
		try {
			const response = await fetch(`/api/calc-course-owner?course_id=${courseData.id}`)

			if (!response.ok) {
				throw new Error('Failed to fetch categories')
			}

			const data = await response.json()
			setTotalCourseOwner(data)
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		calcCourseOwner()
	}, [courseData.id])

	return (
		<div className='flex flex-col  p-4'>
			<div className='flex justify-start items-center gap-6 mb-4'>
				<SingleStat text={`${ratingData.reviewCount} reviews`}>
					<StarRating reviews={courseData.reviews} compact />
				</SingleStat>
				<SingleStat text='Course participants'>
					<p className='font-semibold text-sm'>{totalCourseOwner}</p>
				</SingleStat>
				<SingleStat text='Total'>
					<p className='font-semibold text-sm'>{calcTotalDuration()}</p>
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
