'use client'
import { ShoppingBasket } from 'lucide-react'
import { Button } from '../../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import Link from 'next/link'

const CartButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='icon' variant='ghost'>
					<ShoppingBasket className={'text-muted-foreground'} size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content ' align='start'>
				<ScrollArea.Root>
					<ScrollArea.Viewport style={{ maxHeight: 500 }}>
						<ScrollArea.Scrollbar orientation='vertical'>
							<ScrollArea.Thumb />
						</ScrollArea.Scrollbar>
						<div className='p-4 flex flex-col justify-start items-start max-w-80 gap-4'></div>
					</ScrollArea.Viewport>
				</ScrollArea.Root>
				<div className='w-full border-t border-border my-2'></div>
				<div className='w-full p-2'></div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CartButton
