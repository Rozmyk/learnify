import { useState, useEffect } from 'react'
import StarRating from '@/components/ui/starRating'
import { CourseProps } from '@/types/api'
import Image from 'next/image'
import FavButton from '@/components/FavButton/FavButton'
import { Users } from 'lucide-react'
import formatTimestamp from '@/lib/formatTimestamp'
import Link from 'next/link'

const MiniCourseCard = ({ title, thumbnail, reviews, id, prices, discount, created_at, slug }: CourseProps) => {
	const [courseOwnersLength, setCourseOwnersLength] = useState<null | number>(null)
	const calcCourseOwner = async () => {
		try {
			const response = await fetch(`/api/calc-course-owner?course_id=${id}`)

			if (!response.ok) {
				throw new Error('Failed to fetch categories')
			}

			const data = await response.json()
			setCourseOwnersLength(data)
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		calcCourseOwner()
	}, [id])
	return (
		<Link
			href={`/course/${slug}`}
			className='border-b border-border flex justify-between items-start w-full gap-4 p-2 '>
			<div className='w-16 h-16 min-w-16 min-h-16 relative rounded-lg overflow-hidden'>
				<Image className='object-cover' src={thumbnail} alt='course photo' fill />
			</div>
			<div className='flex flex-col md:flex-row justify-between items-start  w-full'>
				<div>
					<p className='font-semibold'>{title}</p>
					<p className='text-sm text-muted-foreground'>Last updated: {formatTimestamp(created_at)}</p>
				</div>
				<div className='flex justify-start items-center gap-2 md:gap-4'>
					<div className='flex flex-row md:flex-col gap-2 md:gap-0'>
						<StarRating compact reviews={reviews} />
						<div className='flex justify-start items-center gap-1 text-muted-foreground'>
							<Users size={16} />
							<p className='text-sm'>{courseOwnersLength}</p>
						</div>
					</div>
					<div className='flex md:flex-col flex-row md:justify-start justify-center md:items-start items-center gap-1 md:gap-0'>
						<p className='font-semibold text-sm '>{prices.value} zł</p>
						{discount && (
							<p className=' text-xs text-muted-foreground line-through'>
								{(prices.value * (1 - discount / 100)).toFixed(2)} zł
							</p>
						)}
					</div>
					<div className='hidden md:block'>
						<FavButton variant='outline' courseId={id} />
					</div>
				</div>
			</div>
		</Link>
	)
}

export default MiniCourseCard
