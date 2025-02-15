import { CourseProps } from '@/types/api'
import Image from 'next/image'
import StarRating from '@/components/ui/starRating'
const PromotedCourse = ({ course }: { course: CourseProps }) => {
	console.log(course)
	return (
		<div>
			<p className='mb-10 text-2xl'>Our best recommendation for you</p>
			<div className='w-full flex md:flex-row flex-col  justify-between items-start bg-card rounded-xl overflow-hidden shadow-lg border border-border p-2 md:p-4 gap-4'>
				<div className='md:w-1/3 w-full  h-52 md:h-80  relative rounded-xl overflow-hidden '>
					<Image fill src={course.thumbnail} alt={`${course.title} course`} />
				</div>
				<div className=' w-full md:w-2/3 flex flex-col justify-between items-between h-80  	 '>
					<div>
						<h3 className='text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
							{course.title}
						</h3>
						<p className='text-muted-foreground mb-4 line-clamp-2 flex-1'>{course.description}</p>
						<p className='text-muted-foreground text-sm mb-4 line-clamp-2 flex-1'>Author: {course.profiles.username}</p>
						<div className='flex justify-between items-center'>
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
			</div>
		</div>
	)
}

export default PromotedCourse
