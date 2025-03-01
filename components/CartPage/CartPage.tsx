'use client'
import { useCartStore } from '@/context/cart'
import Loader from '../ui/loader'
import EmptyCart from './EmptyCart/EmptyCart'
import SingleCartItem from './SingleCartItem/SingleCartItem'
import Summary from './Summary/Summary'
import LastWishlistItem from './LastWishlistItem/LastWishlistItem'
import { useWishlistStore } from '@/context/wishlist'
import { buyCourses } from '@/lib/buyCourses'
import YouMayAlsoLike from '../YouMayAlsoLike/YouMayAlsoLike'
const CartPage = () => {
	const { cartItems, totalPrice, loading, removeFromCart, removeAllItems } = useCartStore()
	const { toggleFavorite } = useWishlistStore()
	const handleBuyCourses = async () => {
		const selectedCourses = [] as string[]
		cartItems.map(item => {
			selectedCourses.push(item.product_id)
		})

		try {
			await buyCourses(selectedCourses)
			removeAllItems()
		} catch (error) {
			console.error(error)
		}
	}

	return loading ? (
		<div className='w-full h-96 flex justify-center items-center'>
			<Loader />
		</div>
	) : (
		<div className='p-4'>
			<h1 className='text-3xl font-semibold mb-4'>Cart</h1>
			<div className='flex w-full flex-col md:flex-row justify-between items-start gap-8'>
				{cartItems?.length > 0 ? (
					<>
						<div className='w-full md:w-2/3'>
							<div className='border-b border-border w-full mb-4'>
								<p className='py-2 font-semibold'>{cartItems.length} courses in cart</p>
							</div>
							{cartItems.map(item => (
								<SingleCartItem
									onDeleteClick={() => {
										removeFromCart(item.product_id)
									}}
									moveToWishlist={() => {
										toggleFavorite(item.product_id)
									}}
									key={item.id}
									{...item}
								/>
							))}
							<LastWishlistItem />
						</div>
						<div className='w-full md:w-1/3'>
							<Summary handleBuyCourses={handleBuyCourses} totalPrice={totalPrice} />
						</div>
					</>
				) : (
					<EmptyCart />
				)}
			</div>
			{/* <YouMayAlsoLike /> */}
		</div>
	)
}

export default CartPage
