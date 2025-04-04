import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Promotions from '@/components/CartPage/Promotions/Promotions'
import FavButton from '@/components/FavButton/FavButton'
import { CourseProps } from '@/types/api'
import { useOwnedCoursesStore } from '@/context/ownedCourses'
import { CircleAlert, BookOpenText } from 'lucide-react'
import formatTimestamp from '@/lib/formatTimestamp'
import { useCartStore } from '@/context/cart'
import Link from 'next/link'

interface CoursePurchasedCardProps extends CourseProps {
	draftMode: boolean | undefined
}

const CoursePurchaseCard = ({
	thumbnail,
	discount,
	prices,
	id,
	created_at,
	slug,
	draftMode,
}: CoursePurchasedCardProps) => {
	const { owned } = useOwnedCoursesStore()
	const { addToCart, cartItems } = useCartStore()

	const handleAddToCart = () => {
		addToCart(id)
	}

	const isAlreadyOwned = owned.some(item => item.course_id == id)
	const isAlreadyInCart = cartItems.some(item => item.product_id == id)

	let finalPrice = 'Free'
	if (prices) {
		finalPrice = discount ? `${(prices.value * (1 - discount / 100)).toFixed(2)} zł` : `${prices.value} zł`
	}

	return (
		<div className='bg-background md:border md:border-border opacity-95 rounded-lg shadow-lg'>
			<div className='w-full h-44 relative mb-4 md:rounded-lg overflow-hidden'>
				{thumbnail ? (
					<>
						<Image fill src={thumbnail} alt='course photo' className='object-cover' />
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
					</>
				) : (
					<div className='bg-primary flex justify-center items-center text-secondary w-full h-full'>
						<BookOpenText size={75} />
					</div>
				)}
			</div>

			{isAlreadyOwned ? (
				!draftMode && (
					<div className='p-4'>
						<div className='flex justify-start items-center gap-4 mb-4'>
							<CircleAlert />
							<p className='text-muted-foreground text-sm'>
								You have been attending this course since {formatTimestamp(created_at)}
							</p>
						</div>
						<Link href={`/course/${slug}/learn`}>
							<Button className='w-full py-2'>Go to course</Button>
						</Link>
					</div>
				)
			) : (
				<div className='w-full p-4'>
					<div className='flex gap-2 justify-start items-center mb-4'>
						<p className='font-semibold text-2xl'>{finalPrice}</p>
						{discount && <p className='text-muted-foreground line-through'>{prices.value} zł</p>}
						{discount && <p className='text-muted-foreground'>-{discount} % discount</p>}
					</div>

					{!draftMode && (
						<>
							<div className='flex gap-2 mb-4'>
								{isAlreadyInCart ? (
									<Link className='w-full' href='/cart'>
										<Button className='w-full'>Go to cart</Button>
									</Link>
								) : (
									<Button className='w-full' onClick={handleAddToCart}>
										Add to cart
									</Button>
								)}
								<div>
									<FavButton variant='default' courseId={id} />
								</div>
							</div>
							{!isAlreadyInCart && <Button className='w-full'>Buy now</Button>}
							<p className='text-sm text-center my-2 text-muted-foreground'>30-day money back guarantee</p>
							<Button variant='link'>Share</Button>
							<Promotions withoutText />
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default CoursePurchaseCard
