import { CourseProps } from '@/types/api'
import StarRating from '../ui/starRating'
import Image from 'next/image'
import Loader from '../ui/loader'
import { Button } from '../ui/button'
import FavButton from '../FavButton/FavButton'
import BackButton from './BackButton/BackButton'
const SingleCoursePage = ({ course }: { course: CourseProps }) => {
	return course ? (
		<>
			<div
				style={{
					backgroundImage: `url(${course.thumbnail})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className='h-96 w-full rounded-lg relative flex justify-between items-center gap-8 p-8 border border-border'>
				<BackButton />
				<div className='relative z-10 p-2 h-full flex flex-col justify-end items-start w-2/3'>
					<h1 className='text-4xl font-semibold mb-2'>{course.title}</h1>
					<p>{course.description}</p>
					<StarRating reviews={course.reviews} />
					<p className='text-muted-foreground text-sm'>Created by: {course.profiles.username}</p>
					<p className='text-sm'>Last updated: </p>
				</div>
				<div className='w-1/3   h-full relative z-10   '>
					<div className='sticky top-0 left-0  p-4 bg-background border border-border opacity-95 rounded-lg shadow-lg  '>
						<div className='w-full h-44 relative mb-4 rounded-lg overflow-hidden'>
							<Image fill src={course.thumbnail} alt='course photo' />
						</div>
						<div className='flex gap-2 justify-start items-center '>
							<p className='font-semibold text-3xl'>{course.price} zł</p>
							{course.discount && <p>-{course.discount} % discount</p>}
						</div>
						<div className='flex gap-2 mb-4'>
							<Button className='w-full'>Add to cart</Button>
							<FavButton courseId={course.id} />
						</div>
						<Button className='w-full'>Buy now</Button>
					</div>
				</div>
				<div className='absolute bg-black opacity-55 top-0 left-0 right-0 bottom-0'></div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
			</div>

			<div className='mt-10 border border-border p-4 h-[1500px]'>
				<h3 className='text-2xl font-semibold'>What you will learn</h3>
			</div>
		</>
	) : (
		<Loader />
	)
}

export default SingleCoursePage
