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

const ActionMenu = ({ avatarUrl }: { avatarUrl: string }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'}>
					<Image height={30} width={30} src={avatarUrl} alt='User avatar' className='rounded-full' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content' align='start'>
				<DropdownMenuItem>
					<div className='flex justify-between items-center gap-4 p-2'>
						<Image className='rounded-full' alt='User avatar' height={50} width={50} src={avatarUrl} />
						<div>
							<p className='text-lg font-medium'>Rozmyk</p>
							<p className='text-sm'>kymzor@gmail.com</p>
						</div>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href={'/my-courses'}>My courses</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href='/cart'>My cart</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href='/wishlist'>Wish list</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href='/settings'>Account settings</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Button formAction={signOutAction}>Logout</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ActionMenu
