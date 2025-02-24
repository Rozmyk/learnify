import SingleCartItem from '../SingleCartItem/SingleCartItem'
import { useWishlistStore } from '@/context/wishlist'
import { useCartStore } from '@/context/cart'
import { useState, useEffect } from 'react'
import { CourseProps } from '@/types/api'

const LastWishlistItem = () => {
	const { favorites } = useWishlistStore()
	const { addToCart, cartItems } = useCartStore()
	const [latestCourse, setLatestCourse] = useState<CourseProps | null>(null)

	useEffect(() => {
		const course = favorites.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).at(0)
		if (course) {
			setLatestCourse(course)
		}
	}, [cartItems])
	return (
		latestCourse && (
			<div>
				<div className='border-b border-border w-full mb-4'>
					<p className='py-2 font-semibold'>Recently added to wish list</p>
				</div>
				<SingleCartItem
					product_id={latestCourse.id}
					key={latestCourse.id}
					course={latestCourse}
					moveToCart={() => {
						addToCart(latestCourse.id)
					}}
				/>
			</div>
		)
	)
}

export default LastWishlistItem
