'use client'
import { useWishlistStore } from '@/context/wishlist'
import Loader from '../ui/loader'
import SingleWishlistCard from './SingleWishlistCard/SingleWishlistCard'

const MyWishlistPage = () => {
	const { favorites, loading } = useWishlistStore()
	return loading ? (
		<div>
			<Loader />
		</div>
	) : (
		<div className='flex '>
			{favorites.map(item => {
				return <SingleWishlistCard {...item} key={item.id} />
			})}
		</div>
	)
}

export default MyWishlistPage
