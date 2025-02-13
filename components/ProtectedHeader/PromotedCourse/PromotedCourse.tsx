import { CourseProps } from '@/types/api'
import Image from 'next/image'
import StarRating from '@/components/ui/starRating'
const PromotedCourse = ({ course }: { course: CourseProps }) => {
	console.log(course)
	return (
		<div>
			<p className='mb-10 text-2xl'>Our best recommendation for you</p>
			<div className='w-full flex justify-between items-start bg-card rounded-xl overflow-hidden shadow-lg border border-border p-6 gap-4'>
				<div className='w-1/3 h-80  relative rounded-xl overflow-hidden '>
					<Image fill src={course.thumbnail} alt={`${course.title} course`} />
				</div>
				<div className='w-2/3 flex flex-col justify-between items-between h-80  	 '>
					<div>
						<h3 className='text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
							{course.title}
						</h3>
						<p className='text-muted-foreground mb-4 line-clamp-2 flex-1'>{course.description}</p>
						<p>Author:</p>
						<StarRating />
					</div>

					<p className='text-lg font-semibold'>{course.price} zł</p>
				</div>
			</div>
		</div>
	)
}

export default PromotedCourse
