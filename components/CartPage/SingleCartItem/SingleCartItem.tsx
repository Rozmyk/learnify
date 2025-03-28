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
	const discountPrice = Number(course.price) * (1 - (course.discount || 0) / 100)

	return (
		<div className='w-full flex-col justify-between items-start gap-4 mb-4 p-2'>
			<div className='flex justify-between items-start gap-4 '>
				<div className='flex justify-start items-start gap-4'>
					<div className='w-12 h-12 min-h-12 min-w-12 aspect-square relative overflow-hidden rounded-md'>
						<Image src={course.thumbnail} alt={`Thumbnail for ${course.title}`} className='object-cover' fill />
					</div>

					<div className='flex flex-col justify-start items-start'>
						<p className='font-semibold'>{course.title}</p>
						<StarRating reviews={course.reviews} />
					</div>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<p className='font-semibold text-nowrap'>{discountPrice.toFixed(2)} zł</p>{' '}
					{discountPrice !== Number(course.price) && (
						<p className='font-normal text-sm line-through text-muted-foreground text-nowrap'>{course.price} zł</p>
					)}
				</div>
			</div>
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
	)
}

export default SingleCartItem
