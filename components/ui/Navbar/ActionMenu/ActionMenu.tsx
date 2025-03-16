'use client'
import { useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '../../button'
import Image from 'next/image'
import Link from 'next/link'
import { signOutAction } from '@/app/actions'

const ActionMenu = ({ avatarUrl, username, email }: { avatarUrl: string; username: string; email: string }) => {
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}
	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild onClick={handleOpen}>
				<Button variant={'ghost'}>
					<div className='w-[30px] h-[30px] relative rounded-full overflow-hidden'>
						<Image src={avatarUrl} alt='User avatar' fill />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content' align='start'>
				<DropdownMenuItem onClick={handleClose}>
					<Link href={`/user/${username}`}>
						<div className='flex justify-between items-center gap-4 p-2'>
							<div className='w-12 h-12 relative rounded-full overflow-hidden'>
								<Image fill alt='User avatar' src={avatarUrl} />
							</div>
							<div>
								<p className='text-lg font-medium'>{username}</p>
								<p className='text-sm'>{email}</p>
							</div>
						</div>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleClose}>
					<Link className='w-full' href={'/home/my-courses'}>
						My courses
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleClose}>
					<Link className='w-full' href='/cart'>
						My cart
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleClose}>
					<Link className='w-full' href='/wishlist'>
						Wish list
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleClose}>
					<Link className='w-full' href='/edit-profile'>
						Account settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleClose}>
					<span className='cursor-pointer w-full' onClick={signOutAction}>
						Logout
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ActionMenu
