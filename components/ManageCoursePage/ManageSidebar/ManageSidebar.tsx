'use client'
import { usePathname } from 'next/navigation'
import SingleItem from './SingleItem/SingleItem'
import { Button } from '@/components/ui/button'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import { useEffect } from 'react'

const ManageSidebar = ({ courseId }: { courseId: string }) => {
	const pathname = usePathname()
	const { temporaryData, loadCourse } = useCreateCourseStore()
	const safeData = temporaryData

	const items = [
		{
			href: 'basic',
			text: 'Course landing page',
			complete: !!(
				safeData.title &&
				safeData.subtitle &&
				safeData.description &&
				safeData.language &&
				safeData.level &&
				safeData.categories_id &&
				safeData.thumbnail
			),
		},
		{ href: 'pricing', text: 'Pricing', complete: !!(safeData.price && safeData.currency) },
		{
			href: 'messages',
			text: 'Course messages',
			complete: !!(safeData.welcome_message && safeData.congratulatory_message),
		},
	]

	const allCompleted = items.every(item => item.complete)
	useEffect(() => {
		loadCourse(courseId)
	}, [])

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
