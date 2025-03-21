import { useState } from 'react'
import Link from 'next/link'

const InstructorDrawer = () => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`h-full ${isHovered ? 'w-72' : 'w-16'} bg-background border-r border-border fixed top-0 left-0 bottom-0 transition-all duration-300 ease-in-out`}>
			<div className='p-2 flex flex-col w-full h-full justify-start items-center '>
				<Link href={'/'}>L</Link>
			</div>
		</div>
	)
}

export default InstructorDrawer
