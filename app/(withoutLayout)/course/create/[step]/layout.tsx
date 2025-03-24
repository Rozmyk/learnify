import Bottombar from '@/components/CreateCourseSteps/Bottombar/Bottombar'
import Topbar from '@/components/CreateCourseSteps/Topbar/Topbar'

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ step: string }>
}) {
	const step = (await params).step

	return (
		<div className='flex flex-col justify-between items-center md:max-h-screen h-full'>
			<Topbar step={Number(step)} totalSteps={4} />
			<div className='flex h-[calc(100vh-128px)] flex-1 p-8'>{children}</div>
			<Bottombar step={Number(step)} />
		</div>
	)
}
