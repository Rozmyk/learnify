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
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'}>
					<div className='w-[30px] h-[30px] relative rounded-full overflow-hidden'>
						<Image src={avatarUrl} alt='User avatar' fill />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content' align='start'>
				<DropdownMenuItem>
					<Link href={'/user/edit-profile'}>
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
				<DropdownMenuItem>
					<Link className='w-full' href={'/my-courses'}>
						My courses
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link className='w-full' href='/cart'>
						My cart
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link className='w-full' href='/wishlist'>
						Wish list
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link className='w-full' href='/edit-profile'>
						Account settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<span className='cursor-pointer w-full' onClick={signOutAction}>
						Logout
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ActionMenu
