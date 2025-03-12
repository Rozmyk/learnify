import LessonsSidebar from '@/components/SingleLessonPage/LessonsSiderbar/LessonsSidebar'
export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ lessonId: string }>
}) {
	const lessonId = (await params).lessonId
	return (
		<div className='p-4 flex justify-between items-start'>
			<div className='w-full h-full '>{children}</div>
			<div className=' w-96 h-full'>
				<LessonsSidebar lessonId={lessonId} />
			</div>
		</div>
	)
}
