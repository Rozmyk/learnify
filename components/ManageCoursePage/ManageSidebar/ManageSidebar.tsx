'use client'
import { usePathname } from 'next/navigation'
import SingleItem from './SingleItem/SingleItem'
import { Button } from '@/components/ui/button'

const ManageSidebar = () => {
	const pathname = usePathname()
	const items = [
		{ href: 'goals', text: 'Target participants' },

		{ href: 'basic', text: 'Course landing page' },
		{ href: 'pricing', text: 'Pricing' },
		{ href: 'promotions', text: 'Promotions' },
		{ href: 'messages', text: 'Course massages' },
	]

	return (
		<aside className='flex flex-col gap-4 px-2'>
			{items.map(item => {
				const isActive = pathname.endsWith(item.href)
				return <SingleItem key={item.href} href={item.href} text={item.text} active={isActive} />
			})}
			<Button>Add course</Button>
		</aside>
	)
}

export default ManageSidebar
