import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Promotions from '@/components/CartPage/Promotions/Promotions'
import FavButton from '@/components/FavButton/FavButton'
import { CourseProps } from '@/types/api'
const CoursePurchaseCard = ({ thumbnail, discount, price, id }: CourseProps) => {
	return (
		<div className='md:sticky relative md:top-0 md:right-0 bg-background border border-border opacity-95 rounded-lg shadow-lg  '>
			<div className='w-full h-44 relative mb-4 rounded-lg overflow-hidden'>
				<Image fill src={thumbnail} alt='course photo' />
			</div>
			<div className='w-full p-4'>
				<div className='flex gap-2 justify-start items-center mb-4'>
					<p className='font-semibold text-2xl'>{discount ? (price * (1 - discount / 100)).toFixed(2) : price} zł</p>
					{discount && <p className='text-muted-foreground line-through'>{price}</p>}
					{discount && <p className='text-muted-foreground'>-{discount} % discount</p>}
				</div>

				<div className='flex gap-2 mb-4'>
					<Button className='w-full'>Add to cart</Button>
					<div>
						<FavButton variant='default' courseId={id} />
					</div>
				</div>
				<Button className='w-full'>Buy now</Button>
				<p className='text-sm text-center my-2 text-muted-foreground'>30-day money back guarantee</p>
				<Button variant='link'>Share</Button>
				<Promotions withoutText />
			</div>
		</div>
	)
}

export default CoursePurchaseCard
