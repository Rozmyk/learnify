import { CourseProps } from '@/types/api'
import Link from 'next/link'
import StarRating from '../ui/starRating'
import { addRatingsToCourses } from '@/lib/calcRatings'

const SingleCoursePage = ({ course }: { course: CourseProps }) => {
	return (
		<>
			<div
				style={{
					backgroundImage: `url(${course.thumbnail})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className='h-96 w-full rounded-lg relative'>
				<Link href={'/'} className='absolute top-2 left-2 z-20 cursor-pointer text-muted-foreground font-semibold'>
					Back
				</Link>
				<div className='relative z-10 p-8 h-full flex flex-col justify-end items-start'>
					<h1 className='text-4xl font-semibold mb-2'>{course.title}</h1>
					<p>{course.description}</p>
					<StarRating />
					<p className='text-muted-foreground text-sm'>Created by: {course.profiles.username}</p>
					<p className='text-sm'>Last updated: </p>
				</div>
				<div className='absolute bg-black opacity-55 top-0 left-0 right-0 bottom-0'></div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
			</div>

			<div className='mt-10 border border-border p-4'>
				<h3 className='text-2xl font-semibold'>What you will learn</h3>
			</div>
		</>
	)
}

export default SingleCoursePage
