'use client'
import { ShoppingBasket } from 'lucide-react'
import { Button } from '../../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useCartStore } from '@/context/cart'
import MiniCourseCard from '@/components/MiniCourseCard/MiniCourseCard'
const CartButton = () => {
	const { cartItems, totalPrice } = useCartStore()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='icon' variant='ghost' className='relative'>
					{cartItems.length > 0 && (
						<div className='h-4 w-4 bg-red-500 rounded-full flex justify-center items-center absolute top-0 right-0'>
							<p className='text-xs'>{cartItems.length}</p>
						</div>
					)}
					<ShoppingBasket className={'text-muted-foreground'} size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content ' align='start'>
				<ScrollArea.Root>
					<ScrollArea.Viewport style={{ maxHeight: 500 }}>
						<ScrollArea.Scrollbar orientation='vertical'>
							<ScrollArea.Thumb />
						</ScrollArea.Scrollbar>
						<div className='p-4 flex flex-col justify-start items-start max-w-80 gap-4'>
							{cartItems.length > 0 ? (
								cartItems.map(
									item => item.course && <MiniCourseCard withoutButton={true} key={item.course.id} {...item.course} />
								)
							) : (
								<p>Your cart is empty</p>
							)}
						</div>
					</ScrollArea.Viewport>
				</ScrollArea.Root>
				<div className='w-full border-t border-border my-2'></div>

				<div className='w-full p-2 flex flex-col justify-center items-start gap-2'>
					{cartItems.length > 0 && <h4 className='text-lg font-semibold'>Total: {totalPrice} zł</h4>}
					{cartItems.length > 0 ? (
						<Button className='w-full'>Go to cart</Button>
					) : (
						<Button className='w-full'>Continue shopping</Button>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CartButton
