import LessonsSidebar from '@/components/SingleLessonPage/LessonsSiderbar/LessonsSidebar'
import CourseDetails from '@/components/SingleLessonPage/CourseDetails/CourseDetails'
export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ lessonId: string; id: string }>
}) {
	const lessonId = (await params).lessonId
	const courseId = (await params).id
	return (
		<div className=' flex justify-between items-start'>
			<div className='w-full h-full  '>
				{children}
				<CourseDetails courseId={courseId} />
			</div>
			<div className=' max-w-[420px] w-full h-screen bg-background relative '>
				<LessonsSidebar lessonId={lessonId} courseId={courseId} />
			</div>
		</div>
	)
}
