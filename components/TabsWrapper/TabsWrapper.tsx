'use client'

import { usePathname } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import Link from 'next/link'

export function TabsWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	let value: string = 'my-courses'

	if (pathname.includes('wishlist')) {
		value = 'wishlist'
	} else if (pathname.includes('my-courses')) {
		value = 'my-courses'
	}

	return (
		<Tabs.Root value={value}>
			<Tabs.List className='flex gap-4 border-b pb-2'>
				<Link href={'/home/my-courses'}>
					<Tabs.Trigger
						value='my-courses'
						className='px-4 py-2 text-sm data-[state=active]:font-semibold data-[state=active]:border-b-2 border-primary'>
						All courses
					</Tabs.Trigger>
				</Link>
				<Link href={'/home/wishlist'}>
					<Tabs.Trigger
						value='wishlist'
						className='px-4 py-2 text-sm data-[state=active]:font-semibold data-[state=active]:border-b-2 border-primary'>
						Wishlist
					</Tabs.Trigger>
				</Link>
			</Tabs.List>

			<div className='pt-4'>{children}</div>
		</Tabs.Root>
	)
}
