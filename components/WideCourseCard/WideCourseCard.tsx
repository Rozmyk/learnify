import { CourseProps } from '@/types/api'
import StarRating from '../ui/starRating'
import Image from 'next/image'
import Link from 'next/link'
const WideCourseCard = ({ thumbnail, title, description, reviews, slug, level, price, discount }: CourseProps) => {
	return (
		<Link href={`/course/${slug}`}>
			<div className='w-full flex justify-between items-start gap-8 border-b border-border p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px]'>
				<div className='h-36 w-64 min-h-36 min-w-64 relative rounded-lg overflow-hidden'>
					<Image className='object-cover' alt='course photo' fill src={thumbnail} />
				</div>
				<div className='flex flex-col flex-1'>
					<h3 className='text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300'>{title}</h3>
					<p className='text-muted-foreground text-sm'>{description}</p>
					<StarRating reviews={reviews} />
					<p className='text-sm text-muted-foreground capitalize'>{level}</p>
				</div>
				<div className='flex flex-col justify-center items-center gap-2'>
					{discount && discount > 0 && (
						<p className=' font-semibold '>{(price * (1 - discount / 100)).toFixed(2)} zł</p>
					)}

					<p className={`${discount && discount > 0 ? 'line-through text-muted-foreground' : ' font-semibold'}`}>
						{price} zł
					</p>
				</div>
			</div>
		</Link>
	)
}

export default WideCourseCard
