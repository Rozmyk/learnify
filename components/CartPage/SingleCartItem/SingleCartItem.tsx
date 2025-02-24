import { CartItemProps } from '@/types/api'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import StarRating from '@/components/ui/starRating'

interface SingleCartItemProps extends CartItemProps {
	onDeleteClick?: () => void
	moveToCart?: () => void
	moveToWishlist?: () => void
}

const SingleCartItem = ({ course, onDeleteClick, moveToCart, moveToWishlist }: SingleCartItemProps) => {
	if (!course) return null

	return (
		<div className='w-full flex justify-between items-start gap-4 mb-4 p-2'>
			<div className='flex justify-start items-start gap-4'>
				<div className='w-12 h-12 relative overflow-hidden rounded-md'>
					<Image src={course.thumbnail} alt={`Thumbnail for ${course.title}`} className='object-cover' fill />
				</div>

				<div className='flex flex-col justify-start items-start'>
					<p className='font-semibold'>{course.title}</p>
					<StarRating avgRating={course.avgRating} reviewCount={course.reviewCount} />

					{[onDeleteClick, moveToCart, moveToWishlist].some(Boolean) && (
						<div className='flex justify-start items-center gap-2 mt-2'>
							{onDeleteClick && (
								<Button size='sm' variant='ghost' onClick={onDeleteClick} aria-label='Delete item'>
									Delete
								</Button>
							)}
							{moveToCart && (
								<Button size='sm' variant='ghost' onClick={moveToCart} aria-label='Move item to cart'>
									Move to cart
								</Button>
							)}
							{moveToWishlist && (
								<Button size='sm' variant='ghost' onClick={moveToWishlist} aria-label='Move item to wishlist'>
									Move to wishlist
								</Button>
							)}
						</div>
					)}
				</div>
			</div>
			<p className='font-semibold'>{course.price} zł</p>
		</div>
	)
}

export default SingleCartItem
