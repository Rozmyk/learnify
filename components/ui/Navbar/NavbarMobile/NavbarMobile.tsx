'use client'
import Drawer from './Drawer/Drawer'
import { useState } from 'react'
import { Button } from '../../button'
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
			<button onClick={handleOpen} className='flex flex-col justify-center items-center p-2'>
				<span
					className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
						isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
					}`}></span>
				<span
					className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
						isOpen ? 'opacity-0' : 'opacity-100'
					}`}></span>
				<span
					className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
						isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
					}`}></span>
			</button>

			{isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-30' onClick={handleClose} />}
			<Drawer isOpen={isOpen} />
			{isOpen && (
				<Button onClick={handleClose} className='fixed left-[18rem] top-4 z-50 '>
					X
				</Button>
			)}
		</>
	)
}

export default NavbarMobile
