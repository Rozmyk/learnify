'use client'
import { CourseProps } from '@/types/api'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import StarRating from '@/components/ui/starRating'
import FavButton from '@/components/FavButton/FavButton'

const SingleWishlistCard = ({ title, profiles, thumbnail, reviews, slug, prices, discount, id }: CourseProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const discountPrice = prices.value * (1 - (discount || 0) / 100)
	return (
		<Link href={`/course/${slug}`}>
			<div className='w-80 max-w-80 mix-w-80  p-2'>
				<div
					onMouseEnter={() => {
						setIsHovered(true)
					}}
					onMouseLeave={() => {
						setIsHovered(false)
					}}
					className='relative w-full h-40 border border-border'>
					<div className='absolute top-1 right-1 z-50'>
						<FavButton variant='ghost' courseId={id} />
					</div>
					{isHovered && (
						<div className='absolute opacity-70 bg-black top-0 left-0 right-0 bottom-0 w-full h-full z-40 flex justify-center items-center'></div>
					)}
					<Image fill src={thumbnail} alt='course image' />
				</div>
				<h3 className='line-clamp-2 font-semibold mt-2 h-[3rem] leading-snug'>{title}</h3>

				<p className='capitalize text-muted-foreground text-sm '>{profiles.username}</p>
				<StarRating reviews={reviews} />
				<p className='text-xs text-muted-foreground mb-2'>35 hours, 123 lessons</p>
				<div className='flex  justify-start items-center gap-2'>
					<p className='font-semibold text-nowrap text-sm'>{discountPrice.toFixed(2)} zł</p>{' '}
					{discountPrice !== prices.value && (
						<p className='font-normal text-xs line-through text-muted-foreground text-nowrap'>{prices.value} zł</p>
					)}
				</div>
			</div>
		</Link>
	)
}

export default SingleWishlistCard
