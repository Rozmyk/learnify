'use client'
import { ShoppingBasket } from 'lucide-react'
import { Button } from '../../button'
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useCartStore } from '@/context/cart'
import MiniCourseCard from '@/components/MiniCourseCard/MiniCourseCard'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
const CartButton = () => {
	const { cartItems, totalPrice, originalTotal, fetchCart } = useCartStore()
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}
	useEffect(() => {
		fetchCart()
	}, [])
	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild onClick={handleOpen}>
				<Button size='icon' variant='ghost' className='relative'>
					{cartItems.length > 0 && (
						<div className='h-4 w-4 bg-red-500 rounded-full flex justify-center items-center absolute top-0 right-0'>
							<p className='text-xs text-white'>{cartItems.length}</p>
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
									item =>
										item.course && (
											<span onClick={handleClose} key={item.course.id}>
												<MiniCourseCard withoutButton={true} {...item.course} />
											</span>
										)
								)
							) : (
								<div className='flex justify-start items-center gap-2'>
									<ShoppingCart size={16} />
									<p className='text-sm text-muted-foreground'>Your cart is empty</p>
								</div>
							)}
						</div>
					</ScrollArea.Viewport>
				</ScrollArea.Root>
				<div className='w-full border-t border-border my-2'></div>

				<div className='w-full p-2 flex flex-col justify-center items-start gap-2'>
					{cartItems.length > 0 && (
						<h4 className='text-lg font-semibold'>
							Total: {totalPrice} zł{' '}
							{originalTotal !== totalPrice && (
								<span className=' text-sm ml-2 text-muted-foreground line-through text-nowrap font-normal'>
									{originalTotal} zł
								</span>
							)}
						</h4>
					)}
					{cartItems.length > 0 ? (
						<Link onClick={handleClose} className='w-full' href='/cart'>
							<Button className='w-full'>Go to cart</Button>
						</Link>
					) : (
						<Link onClick={handleClose} className='w-full' href={'/'}>
							<Button className='w-full'>Continue shopping</Button>
						</Link>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CartButton
