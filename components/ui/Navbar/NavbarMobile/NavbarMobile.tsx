'use client'
import Drawer from './Drawer/Drawer'
import { useState } from 'react'
import HamburgerBtn from './HamburgerBtn/HamburgerBtn'
import Overlay from './Overlay/Overlay'
import CloseButton from './CloseButton/CloseButton'
import { Search, ShoppingBasket } from 'lucide-react'
import { Button } from '../../button'
import { ProfileDataProps } from '@/types/api'
import HomeButton from '../HomeButton/HomeButton'
import SearchOverlay from './SearchOverlay/SearchOverlay'
import Link from 'next/link'
interface NavbarMobileProps {
	user: ProfileDataProps | null
}
const NavbarMobile = ({ user }: NavbarMobileProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	const ICON_SIZE = 14
	const handleOpenDrawer = () => setIsDrawerOpen(true)
	const handleCloseDrawer = () => setIsDrawerOpen(false)

	const handleOpenSearch = () => setIsSearchOpen(true)
	const handleCloseSearch = () => setIsSearchOpen(false)

	return (
		<>
			<div className='flex justify-between items-center w-ful '>
				<HamburgerBtn isOpen={isDrawerOpen} handleOpen={handleOpenDrawer} />
				<HomeButton />
				<div className='flex   '>
					<Button size='icon' onClick={handleOpenSearch} variant='ghost'>
						<Search size={ICON_SIZE} />
					</Button>
					<Button size='icon' variant='ghost'>
						<Link href='/cart'>
							<ShoppingBasket size={ICON_SIZE} />
						</Link>
					</Button>
				</div>
			</div>
			{isSearchOpen && <SearchOverlay handleClose={handleCloseSearch} />}
			<Overlay isOpen={isDrawerOpen} handleClose={handleCloseDrawer} />
			<Drawer user={user} isOpen={isDrawerOpen} />
			<CloseButton isOpen={isDrawerOpen} handleClose={handleCloseDrawer} />
		</>
	)
}

export default NavbarMobile
