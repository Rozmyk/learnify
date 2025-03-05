import { CourseProps } from '@/types/api'
import StarRating from '../ui/starRating'
import Image from 'next/image'
import Link from 'next/link'
const WideCourseCard = ({ thumbnail, title, description, reviews, slug, level }: CourseProps) => {
	return (
		<Link href={`/course/${slug}`}>
			<div className='w-full flex justify-start items-start gap-4 border-b border-border p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px]'>
				<div className='h-36 w-64 min-h-36 min-w-64 relative rounded-lg overflow-hidden'>
					<Image className='object-cover' alt='course photo' fill src={thumbnail} />
				</div>
				<div className='flex flex-col'>
					<h3 className='text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300'>{title}</h3>
					<p className='text-muted-foreground text-sm'>{description}</p>
					<StarRating reviews={reviews} />
					<p className='text-sm text-muted-foreground'>{level}</p>
				</div>
			</div>
		</Link>
	)
}

export default WideCourseCard
