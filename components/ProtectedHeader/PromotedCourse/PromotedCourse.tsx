'use client'
import { CourseProps } from '@/types/api'
import Image from 'next/image'
import StarRating from '@/components/ui/starRating'
import Link from 'next/link'
const PromotedCourse = ({ course }: { course: CourseProps }) => {
	const updateLastViewedCourse = async () => {
		try {
			await fetch('/api/updateLastViewed', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ courseId: course.id }),
			})
		} catch (error) {
			console.error('Error updating last viewed course:', error)
		}
	}
	return (
		<>
			<p className='my-4 text-2xl font-semibold'>Our best recommendation for you</p>
			<Link
				href={`/course/${course.slug}`}
				onClick={updateLastViewedCourse}
				className=' relative w-full flex md:flex-row flex-col  justify-between items-start bg-card rounded-xl overflow-hidden  border border-border p-2 md:p-4 gap-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] cursor-pointer'>
				<div className='md:w-2/5 w-full  h-52 md:h-80  relative rounded-xl overflow-hidden '>
					<Image
						className='object-cover transition-transform duration-300 group-hover:scale-110'
						fill
						src={course.thumbnail}
						alt={`${course.title} course`}
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
				</div>

				<div className='absolute bottom-6 left-6 right-4 flex items-center justify-between'>
					<span className='text-sm font-medium px-3 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm'>
						{course.categories.name}
					</span>
				</div>
				<div className=' w-full md:w-3/5 flex flex-col justify-between items-between h-80  	 '>
					<div className='flex flex-col justify-between items-start h-full'>
						<div>
							<h3 className='text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
								{course.title}
							</h3>
							<p className='text-muted-foreground mb-4 line-clamp-2 flex-1'>{course.description}</p>
							<p className='text-muted-foreground text-sm mb-4 line-clamp-2 flex-1'>
								Author: {course.profiles.username}
							</p>
						</div>
						<div className='flex justify-between items-center w-full '>
							<StarRating />
							<div className='flex justify-center items-center gap-2'>
								{course.discount && course.discount > 0 && (
									<p className='text-lg font-semibold '>{(course.price * (1 - course.discount / 100)).toFixed(2)} zł</p>
								)}

								<p
									className={`${course.discount && course.discount > 0 ? 'line-through text-gray-500' : 'text-lg font-semibold'}`}>
									{course.price} zł
								</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	)
}

export default PromotedCourse
