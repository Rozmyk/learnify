'use client'
import { usePathname } from 'next/navigation'
import SingleItem from './SingleItem/SingleItem'
import { Button } from '@/components/ui/button'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const ManageSidebar = () => {
	const pathname = usePathname()
	const { temporaryData } = useCreateCourseStore()
	const safeData = temporaryData

	const items = [
		{
			href: 'basic',
			text: 'Course landing page',
			complete: !!(
				safeData.title &&
				safeData.subtitle &&
				safeData.description &&
				safeData.lang_id &&
				safeData.level_id &&
				safeData.categories_id &&
				safeData.thumbnail
			),
		},
		{ href: 'pricing', text: 'Pricing', complete: !!(safeData.price_id && safeData.currencies_id) },
		{
			href: 'messages',
			text: 'Course messages',
			complete: !!(safeData.welcome_message && safeData.congratulatory_message),
		},
	]

	const allCompleted = items.every(item => item.complete)

	return (
		<aside className='flex flex-col gap-4 px-2'>
			{items.map(item => {
				const isActive = pathname.endsWith(item.href)
				return (
					<SingleItem complete={item.complete} key={item.href} href={item.href} text={item.text} active={isActive} />
				)
			})}
			<Button disabled={!allCompleted}>Publish course</Button>
		</aside>
	)
}

export default ManageSidebar
