import { ProfileDataProps } from '@/types/api'
import { ChevronRight } from 'lucide-react'
import DrawerContent from './DrawerContent/DrawerContent'
import Image from 'next/image'
import Link from 'next/link'
import NormalHeader from './NormalHeader/NormalHeader'

const Drawer = ({
	isOpen,
	user,
	handleCloseDrawer,
}: {
	isOpen: boolean
	user: ProfileDataProps | null
	handleCloseDrawer: () => void
}) => {
	return (
		<div
			className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-card w-64 dark:bg-card ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
			aria-labelledby='drawer-navigation-label'>
			{user ? (
				<>
					<span onClick={handleCloseDrawer}>
						<Link href={`/user/${user.username}`}>
							<div className='flex justify-center items-center gap-4 mb-4 border-b border-b-foreground/10 py-2'>
								<Image className='rounded-full' src={user.avatar_url} width={60} height={60} alt='User avatar' />
								<div>
									<p className='font-semibold capitalize'>Hello, {user.username}</p>
									<p>Welcome back!</p>
								</div>
								<ChevronRight size={18} />
							</div>
						</Link>
					</span>
					<DrawerContent user={user} handleCloseDrawer={handleCloseDrawer} />
				</>
			) : (
				<>
					<NormalHeader handleCloseDrawer={handleCloseDrawer} />
					<DrawerContent user={user} handleCloseDrawer={handleCloseDrawer} />
				</>
			)}
		</div>
	)
}

export default Drawer
