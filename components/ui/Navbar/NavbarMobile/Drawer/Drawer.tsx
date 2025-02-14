import { ProfileDataProps } from '@/types/api'
import { ChevronRight } from 'lucide-react'
import DrawerContent from './DrawerContent/DrawerContent'
import Image from 'next/image'
import Link from 'next/link'

const Drawer = ({ isOpen, user }: { isOpen: boolean; user: ProfileDataProps | null }) => {
	return (
		<div
			className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-card w-64 dark:bg-card ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
			aria-labelledby='drawer-navigation-label'>
			{user ? (
				<>
					<Link href='/user/edit-profile'>
						<div className='flex justify-center items-center gap-4 mb-4'>
							<Image className='rounded-full' src={user.avatar_url} width={60} height={60} alt='User avatar' />
							<div>
								<p className='font-semibold'>Hello, {user.username}</p>
								<p>Welcome back!</p>
							</div>
							<ChevronRight size={18} />
						</div>
					</Link>
					<DrawerContent />
				</>
			) : (
				<p>register</p>
			)}
		</div>
	)
}

export default Drawer
