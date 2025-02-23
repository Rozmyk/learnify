'use client'
import { useCartStore } from '@/context/cart'
import Loader from '../ui/loader'
import EmptyCart from './EmptyCart/EmptyCart'
import SingleCartItem from './SingleCartItem/SingleCartItem'
import Summary from './Summary/Summary'

const CartPage = () => {
	const { cartItems, totalPrice, loading } = useCartStore()

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
							<Summary totalPrice={totalPrice} />
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
