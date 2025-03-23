'use client'
import { useState } from 'react'
import DrawerItem from './DrawerItem/DrawerItem'
import { MonitorPlay, Wrench, CircleHelp } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const InstructorDrawer = () => {
	const [isHovered, setIsHovered] = useState(false)
	const pathname = usePathname()

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`h-full ${isHovered ? 'w-72' : 'w-16'} bg-background border-r border-border fixed top-0 left-0 bottom-0 transition-all duration-300 ease-in-out`}>
			<div className='p-2 flex flex-col w-full h-full justify-start items-center '>
				<Link className=' w-full ' href='/'>
					<div className='w-full flex hover:bg-secondary items-center justify-center py-6 px-2 '>
						<p className={`${isHovered ? 'text-start' : 'text-center'} w-full text-sm font-semibold`}>
							{!isHovered ? 'L' : 'Learnify'}
						</p>
					</div>
				</Link>
				<DrawerItem
					active={pathname === '/instructor/courses'}
					href='/instructor/courses'
					hidden={!isHovered}
					text='Courses'
					icon={MonitorPlay}
				/>
				<DrawerItem
					active={pathname === '/instructor/tools'}
					href='/instructor/tools'
					hidden={!isHovered}
					text='Tools'
					icon={Wrench}
				/>
				<DrawerItem
					active={pathname == '/instructor/help'}
					href='/instructor/help'
					hidden={!isHovered}
					text='Resources'
					icon={CircleHelp}
				/>
			</div>
		</div>
	)
}

export default InstructorDrawer
