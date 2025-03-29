'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import DrawerItem from './DrawerItem/DrawerItem'
import { MonitorPlay, Wrench, CircleHelp } from 'lucide-react'
import Link from 'next/link'
import HomeButton from '@/components/ui/Navbar/HomeButton/HomeButton'

const InstructorDrawer = () => {
	const [isHovered, setIsHovered] = useState(false)
	const pathname = usePathname()

	const allowedPaths = ['/instructor/course', '/instructor/tools', '/instructor/help']
	const showDrawer = allowedPaths.some(path => pathname.startsWith(path)) && !pathname.includes('/manage')

	if (!showDrawer) return null

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`h-full ${isHovered ? 'w-72' : 'w-16'} bg-background border-r border-border fixed top-0 left-0 bottom-0 transition-all duration-300 ease-in-out`}>
			<div className='p-2 flex flex-col w-full h-full justify-start items-center '>
				<div
					className={`w-full flex hover:bg-secondary items-center ${
						isHovered ? 'justify-start' : 'justify-center'
					} py-6 px-2`}>
					<HomeButton compact={!isHovered} />
				</div>

				<DrawerItem
					active={pathname === '/instructor/course'}
					href='/instructor/course'
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
					active={pathname === '/instructor/help'}
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
