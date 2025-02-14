'use client'
import Drawer from './Drawer/Drawer'
import { useState } from 'react'

import Link from 'next/link'
import HamburgerBtn from './HamburgerBtn/HamburgerBtn'
import Overlay from './Overlay/Overlay'
import CloseButton from './CloseButton/CloseButton'
const NavbarMobile = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<>
			<div className='flex gap-5 items-center font-semibold'>
				<Link className='text-xl' href={'/'}>
					Learnify
				</Link>
			</div>
			<HamburgerBtn isOpen={isOpen} handleOpen={handleOpen} />
			<Overlay isOpen={isOpen} handleClose={handleClose} />
			<Drawer isOpen={isOpen} />
			<CloseButton isOpen={isOpen} handleClose={handleClose} />
		</>
	)
}

export default NavbarMobile
