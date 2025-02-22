'use client'
import { ShoppingBasket } from 'lucide-react'
import { Button } from '../../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import * as ScrollArea from '@radix-ui/react-scroll-area'

const CartButton = () => {
	const temporaryShoppingCart = ['one', 'two']
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='icon' variant='ghost' className='relative'>
					<div className='h-4 w-4 bg-red-500 rounded-full flex justify-center items-center absolute top-0 right-0'>
						<p className='text-xs'>{temporaryShoppingCart.length}</p>
					</div>
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
							{temporaryShoppingCart.length > 0 ? <p>cart item</p> : <p>Your cart is empty</p>}
						</div>
					</ScrollArea.Viewport>
				</ScrollArea.Root>
				<div className='w-full border-t border-border my-2'></div>

				<div className='w-full p-2 flex flex-col justify-center items-start gap-2'>
					<h4 className='text-lg font-semibold'>Total: 204 zł</h4>
					{temporaryShoppingCart.length > 0 ? (
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
