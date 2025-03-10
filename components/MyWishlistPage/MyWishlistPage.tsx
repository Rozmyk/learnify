'use client'
import { useWishlistStore } from '@/context/wishlist'
import Loader from '../ui/loader'
import SingleWishlistCard from './SingleWishlistCard/SingleWishlistCard'
import { Button } from '../ui/button'
import Link from 'next/link'

const MyWishlistPage = () => {
	const { favorites, loading } = useWishlistStore()
	return loading ? (
		<div className='flex justify-center items-center w-full py-8'>
			<Loader />
		</div>
	) : (
		<div className='flex min-h-96 '>
			{favorites.length > 0 ? (
				favorites.map(item => {
					return <SingleWishlistCard {...item} key={item.id} />
				})
			) : (
				<div className='flex justify-center items-center w-full p-8'>
					<Link href='/'>
						<Button>Browse Courses</Button>
					</Link>
				</div>
			)}
		</div>
	)
}

export default MyWishlistPage
