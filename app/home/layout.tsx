import * as Tabs from '@radix-ui/react-tabs'
import Link from 'next/link'
export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='p-4'>
			<h1 className='text-4xl my-4 font-semibold mb-4'>My courses</h1>
			<Tabs.Root defaultValue='account'>
				<Tabs.List className='flex gap-4 border-b pb-2'>
					<Link href={'/home/my-courses'}>
						<Tabs.Trigger
							value='account'
							className='px-4 py-2 text-sm data-[state=active]:font-semibold data-[state=active]:border-b-2 border-primary'>
							All courses
						</Tabs.Trigger>
					</Link>
					<Link href={'/home/wishlist'}>
						<Tabs.Trigger
							value='ddd'
							className='px-4 py-2 text-sm data-[state=active]:font-semibold data-[state=active]:border-b-2 border-primary'>
							Wishlist
						</Tabs.Trigger>
					</Link>
				</Tabs.List>

				<div className='pt-4'>
					<Tabs.Content value='account'></Tabs.Content>
					<Tabs.Content value='documents'>
						<p className='text-base'>Access and update your documents.</p>
					</Tabs.Content>
					<Tabs.Content value='settings'>
						<p className='text-base'>Edit your profile or update contact information.</p>
					</Tabs.Content>
				</div>
			</Tabs.Root>
			{children}
		</div>
	)
}
