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
interface NavbarMobileProps {
	user: ProfileDataProps | null
}
const NavbarMobile = ({ user }: NavbarMobileProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const ICON_SIZE = 14
	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<>
			<div className='flex justify-between items-center w-ful '>
				<HamburgerBtn isOpen={isOpen} handleOpen={handleOpen} />
				<HomeButton />
				<div className='flex   '>
					<Button size='icon' variant='ghost'>
						<Search size={ICON_SIZE} />
					</Button>
					<Button size='icon' variant='ghost'>
						<ShoppingBasket size={ICON_SIZE} />
					</Button>
				</div>
			</div>

			<Overlay isOpen={isOpen} handleClose={handleClose} />
			<Drawer user={user} isOpen={isOpen} />
			<CloseButton isOpen={isOpen} handleClose={handleClose} />
		</>
	)
}

export default NavbarMobile
