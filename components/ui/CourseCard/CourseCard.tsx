'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger, Portal } from '@radix-ui/react-popover'
import { CourseProps } from '@/types/api'
import StarRating from '../starRating'
import { useCartStore } from '@/context/cart'
import { useOwnedCoursesStore } from '@/context/ownedCourses'
import CoursePopover from './CoursePopover/CoursePopover'
const CourseCard = ({
	thumbnail,
	title,
	price,
	slug,
	description,
	profiles,
	discount,
	reviews,
	id,
	created_at,
	skills_gained,
	level,
}: CourseProps) => {
	const [open, setOpen] = useState(false)

	const { addToCart, cartItems } = useCartStore()
	const { owned } = useOwnedCoursesStore()

	const isAlreadOwned = owned.some(item => item.course_id == id)
	const isAlreadInCart = cartItems.some(item => item.product_id == id)

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
					<div className='max-w-60 w-60 '>
						<div className='relative h-32 mb-1 border border-border'>
							<Image fill src={thumbnail} alt='course photo' />
						</div>
						<h3 className='font-semibold line-clamp-2 '>{title}</h3>
						<p className='capitalize text-xs text-muted-foreground my-1'>{profiles.username}</p>
						<StarRating reviews={reviews} />
						<p className='font-semibold'>{price} zł</p>
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
					<CoursePopover
						slug={slug}
						skills_gained={skills_gained}
						created_at={created_at}
						title={title}
						description={description}
						id={id}
						level={level}
						addToCart={addToCart}
						isAlreadOwned={isAlreadOwned}
						isAlreadInCart={isAlreadInCart}
					/>
				</PopoverContent>
			</Portal>
		</Popover>
	)
}

export default CourseCard
