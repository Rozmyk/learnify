'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger, Portal } from '@radix-ui/react-popover'
import { CourseProps } from '@/types/api'
import StarRating from './starRating'
import { Button } from './button'
import FavButton from '../FavButton/FavButton'
import { useCartStore } from '@/context/cart'
import { useOwnedCoursesStore } from '@/context/ownedCourses'
import { CircleAlert } from 'lucide-react'
import formatTimestamp from '@/lib/formatTimestamp'
const CourseCard = ({
	thumbnail,
	title,
	price,
	slug,
	categories,
	description,
	profiles,
	discount,
	reviews,
	id,
	created_at,
}: CourseProps) => {
	const [open, setOpen] = useState(false)

	const { addToCart, cartItems } = useCartStore()
	const { owned, fetchOwned } = useOwnedCoursesStore()

	const isAlreadOwned = owned.some(item => item.course_id == id)
	const isAlreadtInCart = cartItems.some(item => item.product_id == id)

	const updateLastViewedCourse = async () => {
		try {
			await fetch('/api/updateLastViewed', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ courseId: id }),
			})
		} catch (error) {
			console.error('Error updating last viewed course:', error)
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Link
					onClick={updateLastViewedCourse}
					href={`/course/${slug}`}
					className='group no-underline flex cursor-pointer'
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}>
					<div className='bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border flex flex-col flex-1'>
						<div className='relative h-52 w-full overflow-hidden'>
							{thumbnail ? (
								<Image
									src={thumbnail}
									alt={title || 'Course Image'}
									fill
									className='object-cover transition-transform duration-300 group-hover:scale-110'
								/>
							) : (
								<div className='h-full w-full flex items-center justify-center bg-muted'>No photo</div>
							)}
							<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
							<div className='absolute bottom-4 left-4 right-4 flex items-center justify-between'>
								<span className='text-sm font-medium px-3 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm'>
									{categories.name}
								</span>
							</div>
						</div>
						<div className='p-6 flex flex-col flex-1'>
							<h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
								{title}
							</h3>
							<p className='text-muted-foreground text-sm mb-4 line-clamp-2 flex-1 capitalize'>
								Autor: {profiles.username}
							</p>
							<div className='flex justify-between items-center'>
								<StarRating reviews={reviews} />
								<div className='flex justify-center items-center gap-2'>
									{discount && discount > 0 && (
										<p className='text-lg font-semibold '>{(price * (1 - discount / 100)).toFixed(2)} zł</p>
									)}

									<p
										className={`${discount && discount > 0 ? 'line-through text-muted-foreground' : 'text-lg font-semibold'}`}>
										{price} zł
									</p>
								</div>
							</div>
							<div className='space-y-4 mt-auto'></div>
						</div>
					</div>
				</Link>
			</PopoverTrigger>

			<Portal>
				<PopoverContent
					className='w-96 bg-background rounded-lg shadow-lg p-4 border border-border z-[9999] animate-in fade-in-0 zoom-in-95'
					side='right'
					align='start'
					sideOffset={8}
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}>
					{isAlreadOwned ? (
						<div className='flex flex-col gap-4 '>
							<div className='flex justify-start items-center gap-4'>
								<CircleAlert />
								<p className='text-muted-foreground '>
									You have been attending this course since {formatTimestamp(created_at)}
								</p>
							</div>
							<Link className='w-full' href={`/course/${slug}`}>
								<Button className='w-full'>Go to course</Button>
							</Link>
						</div>
					) : (
						<>
							<h4 className='text-lg font-semibold'>{title}</h4>
							<p className='text-sm text-muted-foreground mt-2 mb-4'>{description}</p>
							<div className='flex justify-between items-center gap-4'>
								{isAlreadtInCart ? (
									<Link className='w-full' href='/cart'>
										<Button className='w-full'>Go to cart</Button>
									</Link>
								) : (
									<Button
										className='w-full'
										onClick={() => {
											addToCart(id)
										}}>
										Add to cart
									</Button>
								)}

								<div className='w-10'>
									<FavButton courseId={id} />
								</div>
							</div>
						</>
					)}
				</PopoverContent>
			</Portal>
		</Popover>
	)
}

export default CourseCard
