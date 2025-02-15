export default async function CourseLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-full'>
			<main className='h-full lg:pt-[64px] pl-20 lg:pl-96 '>{children}</main>
		</div>
	)
}
