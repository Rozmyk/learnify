import { CourseProps } from '@/types/api'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SingleFavCourse = ({ title, profiles, thumbnail, price, discount, slug }: CourseProps) => {
	return (
		<div className='flex flex-col justify-start items-start'>
			<Link href={`/course/${slug}`} className='flex justify-start items-center gap-4'>
				<div className='relative w-16 min-w-16 min-h-16 h-16 aspect-w-1 aspect-h-1 rounded-md overflow-hidden'>
					<Image src={thumbnail} fill alt='course photo' className='object-cover' />
				</div>

				<div className='flex flex-col '>
					<h4 className='text-sm font-semibold'>{title}</h4>
					<p className='text-sm text-muted-foreground'>{profiles.username}</p>
					<div className='flex justify-start items-center gap-2 mt-2 '>
						{discount && discount > 0 && (
							<p className='text-sm font-semibold '>{(price * (1 - discount / 100)).toFixed(2)} zł</p>
						)}

						<p
							className={`${discount && discount > 0 ? 'line-through text-gray-500 text-sm' : 'text-sm font-semibold'}`}>
							{price} zł
						</p>
					</div>
				</div>
			</Link>
			<Button variant='outline' size='sm' className='w-full mt-2'>
				Add to cart
			</Button>
		</div>
	)
}

export default SingleFavCourse
