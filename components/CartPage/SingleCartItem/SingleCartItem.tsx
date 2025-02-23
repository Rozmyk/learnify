import { CartItemProps } from '@/types/api'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import StarRating from '@/components/ui/starRating'
import { useCartStore } from '@/context/cart'

const SingleCartItem = ({ course, product_id }: CartItemProps) => {
	const { removeFromCart } = useCartStore()
	if (!course) return null
	return (
		<div className='w-full  flex justify-between items-start gap-4 mb-4 p-2 ' key={product_id}>
			<div className='flex justify-start items-start gap-4'>
				<div className='w-12 h-12 relative '>
					<Image src={course.thumbnail} alt='course photo' className='object-cover' fill />
				</div>

				<div className='flex flex-col justify-start items-start'>
					<p className='font-semibold'>{course?.title}</p>
					<StarRating avgRating={course?.avgRating} reviewCount={course?.reviewCount} />
					<div>
						<Button
							size='sm'
							variant='ghost'
							onClick={() => {
								removeFromCart(product_id)
							}}>
							Delete
						</Button>
					</div>
				</div>
			</div>
			<p className='font-semibold'>{course?.price} zł</p>
		</div>
	)
}

export default SingleCartItem
