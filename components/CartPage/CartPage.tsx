'use client'
import { useCartStore } from '@/context/cart'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CartItemProps } from '@/types/api'
import Loader from '../ui/loader'
import StarRating from '../ui/starRating'
import EmptyCart from './EmptyCart/EmptyCart'
import Promotions from './Promotions/Promotions'

const CartPage = () => {
	const { cartItems, totalPrice, loading, removeFromCart } = useCartStore()
	const SingleCartItem = ({ course, product_id }: CartItemProps) => {
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
	return loading ? (
		<Loader />
	) : (
		<div className='p-4'>
			<h1 className='text-3xl font-semibold mb-4'>Cart</h1>
			<div className='flex w-full flex-col md:flex-row justify-between items-start gap-8'>
				{cartItems.length > 0 ? (
					<>
						<div className='w-full md:w-2/3'>
							<div className='border-b border-border w-full mb-4'>
								<p className='py-2 font-semibold'>{cartItems.length} courses in cart</p>
							</div>
							{cartItems.map(item => (
								<SingleCartItem key={item.id} {...item} />
							))}
						</div>
						<div className='w-full md:w-1/3'>
							<p className='text-muted-foreground text-lg font-semibold'>Summary:</p>
							<p className='text-3xl font-semibold mb-2'>{totalPrice} zł</p>
							<Button className='w-full mb-2'>Go to checkout</Button>
							<p className='text-muted-foreground text-sm'>You won't pay anything yet</p>
							<div className='border-b border-border my-4'></div>
							<Promotions />
						</div>
					</>
				) : (
					<EmptyCart />
				)}
			</div>
		</div>
	)
}

export default CartPage
