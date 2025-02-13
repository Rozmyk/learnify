import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '../../button'
import Image from 'next/image'

const ActionMenu = ({ avatarUrl }: { avatarUrl: string }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'}>
					<Image height={30} width={30} src={avatarUrl} alt='User avatar' className='rounded-full' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content' align='start'>
				<DropdownMenuItem>Edit</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ActionMenu
