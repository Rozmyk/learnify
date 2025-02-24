'use client'
import { Heart } from 'lucide-react'
import { Button } from '../../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useCartStore } from '@/context/cart'
import MiniCourseCard from '@/components/MiniCourseCard/MiniCourseCard'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import { useWishlistStore } from '@/context/wishlist'
import Loader from '../../loader'
import { useEffect, useState } from 'react'

const FavCoursesButton = ({ userId }: { userId: string }) => {
	const { favorites, loading, fetchFavorites } = useWishlistStore()
	const { addToCart, cartItems } = useCartStore()
	const [isOpen, setIsOpen] = useState(false)
	const handleClose = () => {
		setIsOpen(false)
	}
	const handleOpen = () => {
		setIsOpen(true)
	}
	useEffect(() => {
		if (!favorites || favorites.length === 0) {
			fetchFavorites()
		}
	}, [userId, favorites, fetchFavorites])

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild onClick={handleOpen}>
				<Button size='icon' variant='ghost'>
					<Heart className={'text-muted-foreground'} size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content ' align='start'>
				<ScrollArea.Root>
					<ScrollArea.Viewport style={{ maxHeight: 500 }}>
						<ScrollArea.Scrollbar orientation='vertical'>
							<ScrollArea.Thumb />
						</ScrollArea.Scrollbar>
						<div className='p-4 flex flex-col justify-start items-start max-w-80 gap-4'>
							{loading ? (
								<div className='w-full flex justify-center items-center'>
									<Loader />
								</div>
							) : favorites && favorites.length > 0 ? (
								favorites.map(course => {
									return (
										<span onClick={handleClose} key={course.id}>
											<MiniCourseCard
												withoutButton={cartItems.some(item => item.product_id == course.id)}
												onClick={() => {
													addToCart(course.id)
												}}
												{...course}
											/>
										</span>
									)
								})
							) : (
								<p>Your wish list is empty.</p>
							)}
						</div>
					</ScrollArea.Viewport>
				</ScrollArea.Root>
				<div className='w-full border-t border-border my-2'></div>
				<div className='w-full p-2'>
					{favorites && favorites.length > 0 ? (
						<Link onClick={handleClose} href='/wishlist'>
							<Button className='w-full'>Go to wishlist</Button>
						</Link>
					) : (
						<Link onClick={handleClose} href={'/'}>
							<Button className='w-full'>Discover courses</Button>
						</Link>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default FavCoursesButton
